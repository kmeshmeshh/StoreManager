using Microsoft.EntityFrameworkCore;
using StoreManager.DAL.Data.Modals;
using StoreManager.DAL.Repository;
using StoreManager.Modals;

public class ReturnRepository : IReturnRepository
{
    private readonly StoreContext _context;

    public ReturnRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<bool> AddReturnAsync(ReturnInvoice returnInvoice)
    {
        await _context.ReturnInvoices.AddAsync(returnInvoice);
        var result = await _context.SaveChangesAsync();
        return result > 0;
    }

    public async Task<ReturnInvoice?> GetReturnByIdAsync(int id)
    {
        return await _context.ReturnInvoices
            .Include(r => r.ReturnItems)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<IEnumerable<ReturnInvoice>> GetAllReturnsAsync()
    {
        return await _context.ReturnInvoices
            .Include(r => r.ReturnItems)
            .OrderByDescending(r => r.ReturnDate)
            .ToListAsync();
    }

    public async Task<IEnumerable<ReturnInvoice>> GetReturnsByOriginalInvoiceIdAsync(int originalInvoiceId)
    {
        return await _context.ReturnInvoices
            .Include(r => r.ReturnItems)
            .Where(r => r.OriginalInvoiceId == originalInvoiceId)
            .ToListAsync();
    }

    public async Task<int> GetTotalReturnedQuantityAsync(int originalInvoiceId, int productId)
    {
        var totalReturned = await _context.ReturnInvoices
            .Where(r => r.OriginalInvoiceId == originalInvoiceId)
            .SelectMany(r => r.ReturnItems)          
            .Where(item => item.ProductId == productId)   
            .SumAsync(item => item.Quantity);         

        return totalReturned;
    }
}