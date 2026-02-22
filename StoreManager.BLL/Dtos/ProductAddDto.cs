namespace StoreManager.BLL.Dtos
{
    public class ProductAddDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal ActualPrice { get; set; }
        public decimal SellPrice { get; set; }
        public int Amount { get; set; }
    }
}
