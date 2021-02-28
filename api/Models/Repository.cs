using System.Collections.Generic;
using System.Threading.Tasks;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Models {
    /// <summary>Create a repository for a given Entity. Allows for easy data access.</summary>
    /// Implementation of ideas from Microsoft.eShopWeb.Infrastructure.Data
    public class Repository<T> : IRepository<T> where T : RepoEntity {
        protected readonly ApiContext _context;

        public Repository(ApiContext context) {
            _context = context;
        }

        public virtual async Task<IEnumerable<T>> Get() => 
            await _context.Set<T>().ToListAsync();

        public virtual async Task<T> Get(long id) => 
            await _context.Set<T>().FindAsync(id);

        public async Task<T> Add(T entity) {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Update(T entity) {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public virtual async Task<bool> Exists(long id) => 
            await _context.Set<T>().AnyAsync(e => e.Id == id);
    }
}