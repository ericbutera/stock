using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces {
    public interface IRepository<T> where T : RepoEntity {
        /// <summary>Fetch all records</summary>
        Task<T> Get(long id);

        /// <summary>Fetch a single record by primary key</summary>
        Task<IEnumerable<T>> Get();

        /// <summary>Add and save a new entity</summary>
        Task<T> Add(T entity);

        /// <summary>Update an entity</summary>
        Task Update(T entity);
        
        /// <summary>Does the entity exist?</summary>
        Task<bool> Exists(long id);
    }
}