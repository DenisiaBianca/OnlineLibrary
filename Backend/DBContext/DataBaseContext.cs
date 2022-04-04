using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineLibrary.Entities;

namespace OnlineLibrary.DBContext
{
    public class DataBaseContext : IdentityDbContext<User>
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {

        }

        public DbSet<Client> Client { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductsCategories> ProductsCategories{ get; set; }
        public DbSet<Borrows> Borrows { get; set; }
        public DbSet<ProductTypes> ProductTypes { get; set; }

        public IRepository<T> GetRepository<T>() where T : Entity
        {
            return new Repository<T>(this);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Product>().Property(f => f.Id).ValueGeneratedOnAdd();
            builder.Entity<Borrows>().Property(f => f.Id).ValueGeneratedOnAdd();
            builder.Entity<ProductsCategories>().Property(f => f.Id).ValueGeneratedOnAdd();

        }
    }
}
