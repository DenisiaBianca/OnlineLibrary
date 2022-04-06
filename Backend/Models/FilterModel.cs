using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.Models
{
    public class FilterModel
    {
        public bool Books { get; set; }
        public bool Magazines { get; set; }
        public bool DVD { get; set; }
        public bool CD { get; set; }
        public int? beginYear { get; set; }
        public int? endYear { get; set; }
    }
}
