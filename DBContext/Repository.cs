using Microsoft.EntityFrameworkCore;
using OnlineLibrary.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.DBContext
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly DataBaseContext Context;
        protected DbSet<T> DbSet;
        private IQueryable<T> queryable;

        public IQueryable<T> Queryable => queryable;

        public Repository(DataBaseContext context)
        {
            Context = context;
            DbSet = context.Set<T>();
            queryable = DbSet;
        }

        public async Task AddAsync(T entity)
        {
            DbSet.Add(entity);
            await Save();
        }

        public async Task DeleteAsync(T entity)
        {
            DbSet.Remove(entity);
            await Save();
        }

        public async Task DeleteAsync(int id)
        {
            await DeleteAsync(await DbSet.FindAsync(id));
        }

        public async Task<IQueryable<T>> GetAllAsync()
        {
            return await Task.Run(() => DbSet);
        }

        public async Task<T> GetAsync<TKey>(TKey id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task Save()
        {
            await Context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            DbSet.Update(entity);
            await Save();
        }
    }
}
