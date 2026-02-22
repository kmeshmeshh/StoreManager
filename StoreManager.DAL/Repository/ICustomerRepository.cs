using StoreManager.Modals;

namespace StoreManager.DAL.Repository
{
    public interface ICustomerRepository
    {
        Customers GetByPhone(string phone);
        Customers Add(Customers customer);
        IEnumerable<Customers> GetAll();

        void SaveChanges();
    }
}