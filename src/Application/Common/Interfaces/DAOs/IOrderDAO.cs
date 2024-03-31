using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Common.Interfaces.DAOs;

public interface IOrderDAO : IBaseDAO<Order>
{    
    Task<IEnumerable<Order>?> GetByBranchId(int branchId);
    Task<IEnumerable<Order>?> GetByResponsible(int responsibleId);
    Task<IEnumerable<Order>?> GetWithDeliveryDateBetween(DateTime? startDate, DateTime? endDate);
    Task<IEnumerable<Order>?> GetByDeliveryDateRangeBetween(DateTime? deliveryFrom, DateTime? deliveryTo);
}
