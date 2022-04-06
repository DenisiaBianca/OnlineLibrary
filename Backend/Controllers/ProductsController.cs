using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public ProductsController(IBlobServices blobServices, DataBaseContext dBContext, IRepository<Product> productRepo)
        {
            _blobServices = blobServices;
            _dBContext = dBContext;
            _productRepo = productRepo;
        }

        [HttpGet]
        public IEnumerable<string> GetBlobs()
        {
            return _blobServices.GetBlobNameAsync().Result;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            await _blobServices.UploadBlobAsync(file);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> GetProducts([FromBody] FilterModel filter)
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

            return Ok(products);
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = _dBContext.Categories;
            return Ok(categories);
        }
    }
}
