using StoreManager.BLL.Dtos;

namespace StoreManager.BLL.Managers
{
    public interface IReturnManager
    {
        Task<bool> ProcessReturnAsync(CreateReturnDto returnDto);
    }
}