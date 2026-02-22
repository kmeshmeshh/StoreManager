using System.ComponentModel.DataAnnotations;

namespace StoreManager.Modals
{
    public class Customers
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

        public virtual List<Orders> Orders { get; set; }
    }
}