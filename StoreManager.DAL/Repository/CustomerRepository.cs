using Microsoft.EntityFrameworkCore;
using StoreManager.Modals;

namespace StoreManager.DAL.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly StoreContext _context;

        public CustomerRepository(StoreContext context)
        {
            _context = context;
        }

        public IEnumerable<Customers> GetAll()
        {
            return _context.Customers
                           .Include(c => c.Orders)
                           .ToList();
        }

        public Customers Add(Customers customer)
        {
            _context.Customers.Add(customer);
            return customer;
        }

        public Customers GetByPhone(string phone)
        {
            return _context.Customers.FirstOrDefault(c => c.PhoneNumber == phone);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}