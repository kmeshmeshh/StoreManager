using Microsoft.EntityFrameworkCore;
using StoreManager.Modals;

namespace StoreManager.DAL.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }
        public void Add(Products product)
        {
            _context.Add(product);
            _context.SaveChanges();
        }

        public void Delete(Products product)
        {
            _context.Remove(product);
            _context.SaveChanges();
        }

        public IQueryable<Products> GetAll()
        {
            return _context.Products.AsNoTracking();
        }

        public Products GetById(int id)
        {
            return _context.Products.Find(id);
        }
        public Products GetByCode(string code)
        {
            return _context.Products.FirstOrDefault(p => p.Code == code);
        }
        public void Update(Products product)
        {
            _context.Products.Update(product);
            _context.SaveChanges();
        }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
