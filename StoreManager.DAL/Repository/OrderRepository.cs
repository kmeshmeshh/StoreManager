using Microsoft.EntityFrameworkCore;
using StoreManager.Modals;

namespace StoreManager.DAL.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly StoreContext _context;

        public OrderRepository(StoreContext context)
        {
            _context = context;
        }

        public void Add(Orders order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        public IQueryable<Orders> GetAll()
        {
            return _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .AsNoTracking();
        }



        public Orders GetById(int id)
        {
            return _context.Orders
           .Include(o => o.OrderItems) 
           .FirstOrDefault(o => o.Id == id);
        }

        public Orders GetByIdWithDetails(int id)
        {
            return _context.Orders
                .Include(o => o.Customer)        
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefault(o => o.Id == id);
        }
    }
}