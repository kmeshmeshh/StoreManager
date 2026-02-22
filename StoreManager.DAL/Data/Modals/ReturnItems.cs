using StoreManager.Modals;

namespace StoreManager.DAL.Data.Modals
{
    public class ReturnItems
    {
        public int Id { get; set; }
        public int ReturnInvoiceId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitSellingPrice { get; set; }
        public decimal UnitCostPrice { get; set; }
        public decimal RefundAmount { get; set; }
        public int? OriginalOrderItemId { get; set; }
        public virtual ReturnInvoice ReturnInvoice { get; set; }
        public virtual Products Product { get; set; }
        public virtual OrderItems OriginalOrderItem { get; set; }
    }
}