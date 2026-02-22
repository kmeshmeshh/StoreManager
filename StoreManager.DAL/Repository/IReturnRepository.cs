using StoreManager.DAL.Data.Modals;
namespace StoreManager.DAL.Repository
{
    public interface IReturnRepository
    {
        Task<bool> AddReturnAsync(ReturnInvoice returnInvoice);
        Task<ReturnInvoice?> GetReturnByIdAsync(int id);
        Task<IEnumerable<ReturnInvoice>> GetAllReturnsAsync();
        Task<IEnumerable<ReturnInvoice>> GetReturnsByOriginalInvoiceIdAsync(int originalInvoiceId);
        Task<int> GetTotalReturnedQuantityAsync(int originalInvoiceId, int productId);
    }
}