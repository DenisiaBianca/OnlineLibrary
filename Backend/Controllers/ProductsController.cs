using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public ProductsController(IBlobServices blobServices)
        {
            _blobServices = blobServices;
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
    }
}
