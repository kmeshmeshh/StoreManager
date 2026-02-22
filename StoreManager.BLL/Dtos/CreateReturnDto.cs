namespace StoreManager.BLL.Dtos
{
    public class CreateReturnDto
    {
        public int OriginalInvoiceId { get; set; }
        public string? Note { get; set; }
        public List<ReturnItemDto> Items { get; set; } = new();
    }
    
    public class ReturnItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitRefundPrice { get; set; } 
    }
}