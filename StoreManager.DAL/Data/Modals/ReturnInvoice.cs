namespace StoreManager.DAL.Data.Modals
{
    public class ReturnInvoice
    {
        public int Id { get; set; }
        public int OriginalInvoiceId { get; set; }
        public DateTime ReturnDate { get; set; } = DateTime.Now;
        public decimal TotalRefundAmount { get; set; }
        public string? Note { get; set; }

        public virtual ICollection<ReturnItems> ReturnItems { get; set; } = new List<ReturnItems>();
    }
}
