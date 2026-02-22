using Microsoft.EntityFrameworkCore;
using StoreManager.DAL.Data.Modals;

namespace StoreManager.Modals
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options):base(options)
        {
            
        }
        public DbSet<Products> Products { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<ReturnInvoice> ReturnInvoices { get; set; }
        public DbSet<ReturnItems> ReturnItems { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }
    }
}
