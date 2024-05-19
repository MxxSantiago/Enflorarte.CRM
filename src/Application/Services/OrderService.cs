using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class OrderService(IOrderDAO repository, IValidator<Order> validator)
    : BaseService<Order>(repository, validator)
{
    public override async Task<int> AddAsync(Order entity)
    {
        await ValidateAsync(entity);
        await repository.AddAsync(entity);
        await repository.SaveChangesAsync();
        return entity.Id;
    }

    public override async Task UpdateAsync(Order entity)
    {
        await ValidateAsync(entity);
        await repository.UpdateAsync(entity);
        await repository.SaveChangesAsync();
    }
}
