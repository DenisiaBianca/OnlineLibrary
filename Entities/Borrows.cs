using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineLibrary.Entities
{
    public class Borrows : Entity
    {
        [Key]
        [ReadOnly(true)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Guid ClientId { get; set; }
        public int ProductId { get; set; }
        public int ProductTypeId { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime ReservedDate {get;set;}

        [JsonIgnore]
        [ForeignKey(nameof(ClientId))]
        public Client Client { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ProductTypeId))]
        public ProductTypes ProductTypes { get; set; }

    }
}
