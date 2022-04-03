using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineLibrary.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IBlobServices _blobServices;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IBlobServices blobServices)
        {
            _logger = logger;
            _blobServices = blobServices;
        }

        [HttpGet]
        public IEnumerable<string> GetBlobs()
        {
            return (IEnumerable<string>)_blobServices.GetBlobNameAsync();
        }
    }
}
