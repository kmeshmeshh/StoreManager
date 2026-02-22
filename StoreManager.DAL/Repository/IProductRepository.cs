using StoreManager.Modals;

namespace StoreManager.DAL.Repository
{
    public interface IProductRepository
    {
        IQueryable<Products> GetAll();
        Products GetById(int id);
        Products GetByCode(string code);
        void Update(Products product);
        void Add(Products product);
        void Delete(Products product);
        void SaveChanges();
    }
}
