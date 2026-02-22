using StoreManager.Modals;

namespace StoreManager.BLL.Dtos
{
    public class OrderReadDto
    {
        public int Id { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Discount { get; set; }
        public Customers Customer { get; set; }
        public virtual List<OrderItems> OrderItems { get; set; }

    }
}