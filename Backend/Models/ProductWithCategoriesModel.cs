using OnlineLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.Models
{
    public class ProductWithCategoriesModel
    {
        public Product Product { get; set; }
        public List<string> Categories { get; set; }
    }
}
