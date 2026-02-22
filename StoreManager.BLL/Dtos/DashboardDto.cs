namespace StoreManager.BLL.Dtos
{
    public class DashboardDto
    {
        public decimal DailySales { get; set; }
        public decimal DailyTotalCost { get; set; }
        public decimal DailyNetProfit { get; set; } 
        public int DailyOrdersCount { get; set; }
        public int DailyItemsSold { get; set; }
        public decimal DailyReturnsAmount { get; set; }    
        public int DailyReturnsCount { get; set; }
        public int DailyReturnedItems { get; set; }       

        public List<ShortageProductDto> ShortageProducts { get; set; }
        public List<WeeklySalesItem> WeeklySales { get; set; }
        public List<WeeklyReturnsItem> WeeklyReturns { get; set; }
        public List<RecentReturnDto> RecentReturns { get; set; }   
    }

    public class WeeklySalesItem
    {
        public string DayName { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

    public class ShortageProductDto
    {
        public string ProductName { get; set; }
        public string Category { get; set; }
        public int Amount { get; set; }
    }

    public class WeeklyReturnsItem
    {
        public string DayName { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

    public class RecentReturnDto
    {
        public int ReturnId { get; set; }
        public int OriginalInvoiceId { get; set; }
        public DateTime ReturnDate { get; set; }
        public decimal TotalRefundAmount { get; set; }
        public int ItemsCount { get; set; }
        public string? Note { get; set; }
    }
}