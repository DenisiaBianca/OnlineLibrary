using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.Models
{
    public class BorrowModel
    {
        public int Id { get; set; }
        public string ClientEmail { get; set; }
        public string ProductName { get; set; }
        public DateTime? BorrowDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public DateTime ReservedDate { get; set; }

    }
}
