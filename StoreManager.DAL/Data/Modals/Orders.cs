using System.ComponentModel.DataAnnotations.Schema;

namespace StoreManager.Modals
{
    public class Orders
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        public decimal Discount { get; set; }
        public int? CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public virtual Customers Customer { get; set; }
        public virtual List<OrderItems> OrderItems { get; set; }
    }
}