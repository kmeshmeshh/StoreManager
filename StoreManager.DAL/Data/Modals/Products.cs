using Microsoft.EntityFrameworkCore; 
using System.ComponentModel.DataAnnotations;

namespace StoreManager.Modals
{
    [Index(nameof(Code), IsUnique = true)]
    public class Products
    {
        public int Id { get; set; }
        [Required]
        public string Code { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal ActualPrice { get; set; }
        public decimal SellPrice { get; set; }
        public int Amount { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
