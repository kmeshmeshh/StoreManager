using Microsoft.EntityFrameworkCore;
using StoreManager.BLL.Dtos;
using StoreManager.BLL.Managers;
using StoreManager.DAL.Data.Modals;
using StoreManager.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ReturnManager : IReturnManager
{
    private readonly StoreContext _context;

    public ReturnManager(StoreContext context)
    {
        _context = context;
    }

    public async Task<bool> ProcessReturnAsync(CreateReturnDto returnDto)
    {
        var originalOrder = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == returnDto.OriginalInvoiceId);

        if (originalOrder == null)
            throw new Exception("Original order not found");

        var returnInvoice = new ReturnInvoice
        {
            OriginalInvoiceId = originalOrder.Id,
            ReturnDate = DateTime.Now,
            Note = returnDto.Note,
            ReturnItems = new List<ReturnItems>()
        };

        decimal totalRefund = 0;

        foreach (var item in returnDto.Items)
        {
            var originalItem = originalOrder.OrderItems
                .FirstOrDefault(oi => oi.ProductId == item.ProductId);

            if (originalItem == null)
                throw new Exception($"Product {item.ProductId} not found in original order");

            if (item.Quantity > originalItem.Quantity)
                throw new Exception("Returned quantity exceeds sold quantity");

            var returnItem = new ReturnItems
            {
                ProductId = item.ProductId,
                OriginalOrderItemId = originalItem.Id,
                Quantity = item.Quantity,
                UnitSellingPrice = originalItem.UnitPrice,
                UnitCostPrice = originalItem.UnitCostPrice,
                RefundAmount = item.Quantity * originalItem.UnitPrice
            };

            totalRefund += returnItem.RefundAmount;
            returnInvoice.ReturnItems.Add(returnItem);

            var product = await _context.Products.FindAsync(item.ProductId);
            if (product != null)
            {
                product.Amount += item.Quantity;
            }
        }

        returnInvoice.TotalRefundAmount = totalRefund;

        await _context.ReturnInvoices.AddAsync(returnInvoice);
        await _context.SaveChangesAsync();

        return true;
    }
}