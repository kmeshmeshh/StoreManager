using StoreManager.BLL.Dtos;
using System.Collections.Generic;

namespace StoreManager.BLL.Managers
{
    public interface IOrderManager
    {
        IEnumerable<OrderReadDto> GetAll();
        OrderReadDto GetById(int id);
        void CreateOrder(OrderAddDto orderDto);
    }
}