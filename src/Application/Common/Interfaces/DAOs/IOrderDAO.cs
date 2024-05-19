using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Common.Interfaces.DAOs;

public interface IOrderDAO : IBaseDAO<Order>
{
    Task AddAsync(Order entity);
    Task UpdateAsync(Order entity);
}
