using System.ComponentModel.DataAnnotations.Schema;

namespace ShellAPI.Data.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? ItemIds { get; set; }
        public int BranchId { get; set; }
        public DateTime? Created { get; set; }

        [NotMapped]
        public List<Item> items { get; set; }

        [NotMapped]
        public decimal? price { get; set; }

        [NotMapped]
        public Branch? branch { get; set; } 
    }
} 