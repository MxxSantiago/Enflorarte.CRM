using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Common.Interfaces.DAOs;

public interface IOrderDAO : IBaseDAO<Order>
{
    Task AddAsync(Order entity);
    Task UpdateAsync(Order entity);
    Task<List<Order>> GetDayOrderAsync(DateTime day);
    Task<List<Order>> GetWeekOrderAsync(DateTime week);
    Task<List<Order>> GetMonthOrderAsync(DateTime month);
}
