using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.Models
{
    public class SaveProductModel
    {
        public string Name { get; set; }
        public int TypeId { get; set; }
        public string? PublishHouse { get; set; }
        public string? Author { get; set; }
        public int PublishYear { get; set; }
        public int? Pages { get; set; }
        public string? Language { get; set; }
        public string? Cover { get; set; }
        public int Stock { get; set; }
        public string? Artist { get; set; }
        public string? RecordLabel { get; set; }
        public string? Audio { get; set; }
        public string? Suport { get; set; }
        public string? Director { get; set; }
        public string? Studio { get; set; }
        public string? Country { get; set; }
        public int? Time { get; set; }
        public int[] Categories { get; set; }
    }
}
