using OnlineLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibrary.DBContext
{
    public interface IRepository<T> where T : Entity
    {
        Task<T> GetAsync<TKey>(TKey id);
        Task<IQueryable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task DeleteAsync(T entity);
        Task DeleteAsync(int id);
        IQueryable<T> Queryable { get; }
        Task UpdateAsync(T entity);
    }
}
