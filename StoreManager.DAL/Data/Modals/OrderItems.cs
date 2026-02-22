namespace StoreManager.Modals
{
    public class OrderItems
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal UnitCostPrice { get; set; }

        public virtual Orders Order { get; set; }
        public virtual Products Product { get; set; }
    }
}