using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Common;

namespace Enflorarte.CRM.Application.Common.Models;

public abstract class BaseService<TEntity>(IBaseDAO<TEntity> dao, IValidator<TEntity> validator)
    where TEntity : BaseEntity
{
    public async Task<IList<TEntity>> GetAllAsync()
    {
        return (await dao.GetAllAsync() ?? new List<TEntity>()).ToList();
    }

    public async Task<TEntity?> GetAsync(int id) => await dao.GetAsync(id);
    
    public virtual async Task<int> AddAsync(TEntity entity)
    {
        await ValidateAsync(entity);
        dao.Add(entity);
        await dao.SaveChangesAsync();
        return entity.Id;
    }

    public virtual async Task UpdateAsync(TEntity entity)
    {
        await ValidateAsync(entity);
        dao.Update(entity);
        await dao.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await dao.Delete(id);
        await dao.SaveChangesAsync();
    }
    
    protected async Task ValidateAsync(TEntity entity)
    {
        var validationResult = await validator.ValidateAsync(entity);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
    }
}
