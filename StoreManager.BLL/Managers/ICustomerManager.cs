using StoreManager.BLL.Dtos;
using System.Collections.Generic;

namespace StoreManager.BLL.Managers
{
    public interface ICustomerManager
    {
        IEnumerable<CustomerReadDto> GetAll();
    }
}