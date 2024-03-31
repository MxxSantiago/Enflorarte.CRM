namespace Enflorarte.CRM.Application.Common.Interfaces.DAOs;

public interface IBaseDAO<TEntity> where TEntity : class
{
    void Add(TEntity entity);
    void Update(TEntity entity);
    Task<IEnumerable<TEntity>?> GetAllAsync();
    Task<TEntity?> GetAsync(int id);
    Task Delete(int id);
    Task SaveChangesAsync();
}
