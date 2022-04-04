using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace OnlineLibrary.Entities
{
    public class Entity
    {
        public Entity()
        {
            Deleted = false;
        }

        [JsonIgnore]
        public bool Deleted { get; set; }
    }
}
