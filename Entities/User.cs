using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.Entities
{
    public class User : IdentityUser
    {
        public User() : base() { }
        public User(string userName) : base(userName) { }
        public bool IsAdmin { get; set; }
    }
}
