using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public abstract class BaseDAO<TEntity>(ApplicationDbContext context) : IBaseDAO<TEntity>
    where TEntity : BaseEntity
{
    protected readonly ApplicationDbContext _context = context;

    public virtual void Add(TEntity entity) => _context.Set<TEntity>().Add(entity);

    public virtual void Update(TEntity entity) => _context.Set<TEntity>().Update(entity);

    public virtual async Task<IEnumerable<TEntity>?> GetAllAsync() => await _context.Set<TEntity>().ToListAsync();

    public virtual async Task<TEntity?> GetAsync(int id) => await _context.Set<TEntity>().FindAsync(id);

    public async Task Delete(int id)
    {
        var entity = await GetAsync(id);
        if (entity != null)
        {
            _context.Set<TEntity>().Remove(entity);
        }
    }
    
    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
}
