using Azure.Storage.Blobs;
using OnlineLibrary.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineLibrary.Services
{
    public class BlobServices : IBlobServices
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobServices ( BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }
        public async Task<BlobInfo> GetBlobAsync(string name)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient("covers");
            var blobClient = containerClient.GetBlobClient(name);
            var blobDownloadInfo = await blobClient.DownloadContentAsync();

            return new BlobInfo(blobDownloadInfo.Value.Content.ToStream(), blobDownloadInfo.Value.Details.ContentType);
        }

        public async Task<IEnumerable<string>> GetBlobNameAsync()
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient("covers");
            var items = new List<string>();

            await foreach (var blob in containerClient.GetBlobsAsync())
            {
                items.Add(blob.Name);
            }

            return items;
        }
    }
}
