namespace StoreManager.BLL.Dtos
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderAddDto
    {
        public decimal Discount { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public List<OrderItemDto> Items { get; set; }
    }
}