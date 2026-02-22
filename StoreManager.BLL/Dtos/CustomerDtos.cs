namespace StoreManager.BLL.Dtos
{
    public class CustomerReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int OrdersCount { get; set; }
        public decimal TotalSpent { get; set; }
    }
}