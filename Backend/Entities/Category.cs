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
    public class Category
    {
        [Key]
        [ReadOnly(true)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProductTypeId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ProductTypeId))]
        public ProductTypes ProductTypes { get; set; }
    }
}
