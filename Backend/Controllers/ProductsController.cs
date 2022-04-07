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

        [HttpGet]
        public IEnumerable<string> GetBlobs()
        {
            return _blobServices.GetBlobNameAsync().Result;
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

            foreach(var pro in products)
            {
                var categories = _dBContext.ProductsCategories.Where(pc => pc.ProductId == pro.Id).Select(x => x.Category.Name).ToList();
                list.Add( new ProductWithCategoriesModel { Product = pro, Categories = categories});
            }

            return Ok(list);
        }

        [HttpPost]
        public IActionResult SaveProduct([FromBody]SaveProductModel product)
        {
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

            var r = _dBContext.Products.Add(p);

            var productCategories = new List<ProductsCategories>();
            foreach (var c in product.Categories)
            {
                productCategories.Add(new ProductsCategories { CategoryId = c, Product = p });
            }

            _dBContext.ProductsCategories.AddRange(productCategories);

            _dBContext.SaveChanges();

            return Ok();
        }

        [HttpPost]
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

        private void UploadCoverToStorage(IFormFile file, string name)
        {
            _blobServices.UploadBlobAsync(file, name);
        }
    }
}
