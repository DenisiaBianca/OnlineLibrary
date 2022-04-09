using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OnlineLibrary.DBContext;
using OnlineLibrary.Entities;
using OnlineLibrary.Models;
using OnlineLibrary.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IBlobServices _blobServices;
        private readonly DataBaseContext _dBContext;
        private readonly IRepository<Product> _productRepo;
        private readonly IConfiguration _configuration;

        public ProductsController(IBlobServices blobServices, DataBaseContext dBContext, IRepository<Product> productRepo, IConfiguration configuration)
        {
            _blobServices = blobServices;
            _dBContext = dBContext;
            _productRepo = productRepo;
            _configuration = configuration;
        }   

        [HttpPost]
        public IActionResult GetProducts([FromBody] FilterModel filter)
        {
            List<int> types = new List<int>();
            if (filter.Books == true) types.Add(1);
            if (filter.Magazines == true) types.Add(2);
            if (filter.DVD == true) types.Add(3);
            if (filter.CD == true) types.Add(4);

            var products = _dBContext.Products.Where(
                x => x.Deleted == false &&
                types.Contains(x.TypeId) &&
                (filter.beginYear == null || x.PublishYear >= filter.beginYear) &&
                (filter.endYear == null || x.PublishYear <= filter.endYear)).ToList();

            var list = new List<ProductWithCategoriesModel>();

            var userId = Request.HttpContext.User.Identity.Name;
            var clientId = new Guid();
            if(userId != null)
            {
                var client = _dBContext.Client.Where(c => c.UserId == userId).FirstOrDefault();
                if (client != null) clientId = client.Id;
            }

            foreach (var pro in products)
            {
                var categories = _dBContext.ProductsCategories.Where(pc => pc.ProductId == pro.Id).Select(x => new Category{ Name = x.Category.Name, Id = x.Id}).ToList();
                var borrowsNo = _dBContext.Borrows.Where(b => b.ReturnDate == null && b.ProductId == pro.Id).ToList().Count();
                pro.Stock = pro.Stock - borrowsNo;
                var status = 0;

                if(userId != null && clientId != Guid.Empty)
                {
                    var userBorrow = _dBContext.Borrows.Where(b => b.ClientId == clientId && b.ProductId == pro.Id).OrderByDescending(b => b.ReservedDate).FirstOrDefault();

                    if (userBorrow != null)
                    {
                        if (userBorrow.ReturnDate != null && userBorrow.BorrowDate != null && userBorrow.ReservedDate != null) status = 3; //borrow again
                        if (userBorrow.ReturnDate == null && userBorrow.BorrowDate != null && userBorrow.ReservedDate != null) status = 2; //borrowed
                        if (userBorrow.ReturnDate == null && userBorrow.BorrowDate == null && userBorrow.ReservedDate != null) status = 1; //just reserved         
                    }
                }

                list.Add( new ProductWithCategoriesModel{ Product = pro, Categories = categories, Status = status});
            }

            return Ok(list);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult SaveProduct([FromBody]SaveProductModel product)
        {
            var userId = Request.HttpContext.User.Identity.Name;
            var isAdmin = _dBContext.Users.Find(userId).IsAdmin;
            if(isAdmin == false)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "You do not have access!");
            }

            var p = new Product
            {
                Name = product.Name,
                TypeId = product.TypeId,
                PublishHouse = product.PublishHouse,
                Author = product.Author,
                PublishYear = product.PublishYear,
                Pages = product.Pages,
                Language = product.Language,
                Cover = _configuration.GetValue<string>("AzureContainerURL") + product.Cover,
                Stock = product.Stock,
                Artist = product.Artist,
                RecordLabel = product.RecordLabel,
                Audio = product.Audio,
                Suport = product.Suport,
                Director = product.Director,
                Studio = product.Studio,
                Country = product.Country,
                Time = product.Time
            };

            var newProduct = _dBContext.Products.Add(p);

            _dBContext.SaveChanges();

            var productCategories = new List<ProductsCategories>();
            foreach (var c in product.Categories)
            {
                productCategories.Add(new ProductsCategories { CategoryId = c, ProductId = newProduct.Entity.Id });
            }

            _dBContext.ProductsCategories.AddRange(productCategories);

            _dBContext.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadImage([FromForm]IFormFile file, string name)
        {
            await _blobServices.UploadBlobAsync(file, name);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories =  _dBContext.Categories;
            return Ok(categories);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ReserveProduct(int productId)
        {
            var userId = Request.HttpContext.User.Identity.Name;
            var clientId = _dBContext.Client.Where(c => c.UserId == userId).FirstOrDefault().Id;

            var borrow = new Borrows
            {
                ClientId = clientId,
                ProductId = productId,
                ReservedDate = DateTime.Now
            };

            _dBContext.Add(borrow);
            _dBContext.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetAllBorrows()
        {
            var borrows = _dBContext.Borrows.Select(b => new BorrowModel{
                    Id = b.Id,
                    ProductName = b.Product.Name, 
                    ClientEmail = b.Client.Email,
                    ReservedDate = b.ReservedDate,
                    BorrowDate = b.BorrowDate,
                    ReturnDate = b.ReturnDate
            }).ToList();

            return Ok(borrows);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult UpdateBorrow(int id, string type)
        {
            var borrow = _dBContext.Borrows.Find(id);

            if(type == "borrow")
            {
                borrow.BorrowDate = DateTime.Now;
            }
            else if(type == "return")
            {
                borrow.ReturnDate = DateTime.Now;
            }

            _dBContext.Borrows.Update(borrow);
            _dBContext.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult DeleteProduct(int id)
        {
            var product = _dBContext.Products.Find(id);
            if(product != null)
            {
                _dBContext.Products.Remove(product);
                _dBContext.SaveChanges();
            }

            return Ok();
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult updateProductStock(int id, int stock)
        {
            var product = _dBContext.Products.Find(id);
            if (product != null)
            {
                product.Stock = stock;
                _dBContext.SaveChanges();
            }

            return Ok();
        }
    }
}
