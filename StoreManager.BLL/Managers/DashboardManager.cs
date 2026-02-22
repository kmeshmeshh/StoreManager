using Microsoft.EntityFrameworkCore;
using StoreManager.BLL.Dtos;
using StoreManager.Modals;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StoreManager.BLL.Managers
{
    public class DashboardManager : IDashboardManager
    {
        private readonly StoreContext _context;

        public DashboardManager(StoreContext context)
        {
            _context = context;
        }

        public DashboardDto GetStats(DateTime selectedDate)
        {
            var date = selectedDate.Date;
            
            var dailyOrderItems = _context.OrderItems
                .Include(oi => oi.Order)
                .Where(oi => oi.Order.OrderDate.Date == date)
                .ToList();

            decimal totalRevenue = dailyOrderItems
                .Sum(oi => oi.Quantity * oi.UnitPrice);

            decimal totalCost = dailyOrderItems
                .Sum(oi => oi.Quantity * oi.UnitCostPrice);

            int dailyOrdersCount = dailyOrderItems
                .Select(oi => oi.OrderId)
                .Distinct()
                .Count();

            int dailyItemsSold = dailyOrderItems.Sum(oi => oi.Quantity);

            var dailyReturnItems = _context.ReturnItems
                .Include(ri => ri.ReturnInvoice)
                .Where(ri => ri.ReturnInvoice.ReturnDate.Date == date)
                .ToList();

            decimal dailyReturnsAmount = dailyReturnItems
                .Sum(ri => ri.Quantity * ri.UnitSellingPrice);

            decimal dailyReturnsCostRecovery = dailyReturnItems
                .Sum(ri => ri.Quantity * ri.UnitCostPrice);

            int dailyReturnsCount = dailyReturnItems
                .Select(ri => ri.ReturnInvoiceId)
                .Distinct()
                .Count();

            int dailyReturnedItemsCount = dailyReturnItems.Sum(ri => ri.Quantity);


            decimal netRevenue = totalRevenue - dailyReturnsAmount;
            decimal netCost = totalCost - dailyReturnsCostRecovery;
            decimal netProfit = netRevenue - netCost;

            int diff = (7 + (date.DayOfWeek - DayOfWeek.Saturday)) % 7;
            DateTime startOfWeek = date.AddDays(-diff);
            DateTime endOfWeek = startOfWeek.AddDays(7);

            var arabicDays = new[]
                { "سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة" };

            var weeklyOrders = _context.Orders
                .Where(o => o.OrderDate >= startOfWeek && o.OrderDate < endOfWeek)
                .Select(o => new { o.OrderDate, o.TotalPrice })
                .ToList();

            var weeklySalesList = Enumerable.Range(0, 7)
                .Select(i =>
                {
                    var dayDate = startOfWeek.AddDays(i);
                    return new WeeklySalesItem
                    {
                        DayName = arabicDays[i],
                        Date = dayDate,
                        Amount = weeklyOrders
                            .Where(o => o.OrderDate.Date == dayDate)
                            .Sum(o => o.TotalPrice)
                    };
                }).ToList();

            var weeklyReturns = _context.ReturnInvoices
                .Where(r => r.ReturnDate >= startOfWeek && r.ReturnDate < endOfWeek)
                .Select(r => new { r.ReturnDate, r.TotalRefundAmount })
                .ToList();

            var weeklyReturnsList = Enumerable.Range(0, 7)
                .Select(i =>
                {
                    var dayDate = startOfWeek.AddDays(i);
                    return new WeeklyReturnsItem
                    {
                        DayName = arabicDays[i],
                        Date = dayDate,
                        Amount = weeklyReturns
                            .Where(r => r.ReturnDate.Date == dayDate)
                            .Sum(r => r.TotalRefundAmount)
                    };
                }).ToList();

            var recentReturns = _context.ReturnInvoices
                .Include(r => r.ReturnItems)
                .OrderByDescending(r => r.ReturnDate)
                .Take(5)
                .Select(r => new RecentReturnDto
                {
                    ReturnId = r.Id,
                    OriginalInvoiceId = r.OriginalInvoiceId,
                    ReturnDate = r.ReturnDate,
                    TotalRefundAmount = r.TotalRefundAmount,
                    ItemsCount = r.ReturnItems.Count,
                    Note = r.Note
                })
                .ToList();

            var shortageProducts = _context.Products
                .Where(p => !p.IsDeleted && p.Amount <= 3)
                .OrderBy(p => p.Amount)
                .Take(3)
                .Select(p => new ShortageProductDto
                {
                    ProductName = p.Name,
                    Category = p.Category,
                    Amount = p.Amount
                }).ToList();

            return new DashboardDto
            {
                DailySales = totalRevenue,
                DailyTotalCost = totalCost,
                DailyNetProfit = netProfit,
                DailyOrdersCount = dailyOrdersCount,
                DailyItemsSold = dailyItemsSold,

                DailyReturnsAmount = dailyReturnsAmount,
                DailyReturnsCount = dailyReturnsCount,
                DailyReturnedItems = dailyReturnedItemsCount,

                WeeklySales = weeklySalesList,
                WeeklyReturns = weeklyReturnsList,
                RecentReturns = recentReturns,
                ShortageProducts = shortageProducts
            };
        }
    }
    public interface IDashboardManager
    {
        DashboardDto GetStats(DateTime selectedDate);
    }
}