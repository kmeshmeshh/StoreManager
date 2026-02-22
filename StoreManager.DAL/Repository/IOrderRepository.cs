using StoreManager.Modals;

namespace StoreManager.DAL.Repository
{
    public interface IOrderRepository
    {
        IQueryable<Orders> GetAll();
        Orders GetById(int id);
        Orders GetByIdWithDetails(int id);
        void Add(Orders order);

    }
}