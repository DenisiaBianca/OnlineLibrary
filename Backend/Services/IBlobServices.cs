using Microsoft.AspNetCore.Http;
using OnlineLibrary.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineLibrary.Services
{
    public interface IBlobServices
    {
        public Task<BlobInfo> GetBlobAsync(string name);
        public Task<IEnumerable<string>> GetBlobNameAsync();
        public Task UploadBlobAsync(IFormFile file);
    }
}
