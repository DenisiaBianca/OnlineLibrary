using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace OnlineLibrary.Entities
{
    public class Product : Entity
    {
        [Key]
        [ReadOnly(true)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
        public string PublishHouse { get; set; }
        public string Author { get; set; }
        public int PublishYear { get; set; }
        public int Pages { get; set; }
        public string Language { get; set; }
        public string Cover { get; set; }
        public int Stock { get; set; }
        public string Artist { get; set; }
        public string RecordLabel { get; set; }
        public string Audio { get; set; }
        public string Suport { get; set; }
        public string Director { get; set; }
        public string Studio { get; set; }
        public string Country { get; set; }
        public int Time { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(TypeId))]
        public ProductTypes ProductTypes { get; set; }

    }
}
