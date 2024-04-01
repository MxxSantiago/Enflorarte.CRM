using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Application.Validators;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;

public class OrderService(IOrderDAO repository, OrderValidator validator)
    : BaseService<Order>(repository, validator)
{
    public async Task<IList<Order>> GetByBranchId(int branchId) =>
        (await repository.GetByBranchId(branchId) ?? new List<Order>()).ToList();

    public async Task<IList<Order>> GetByResponsible(int responsibleId) =>
        (await repository.GetByResponsible(responsibleId) ?? new List<Order>()).ToList();

    public async Task<IList<Order>> GetWithDeliveryDateBetween(DateTime? startDate, DateTime? endDate) =>
        (await repository.GetWithDeliveryDateBetween(startDate, endDate) ?? new List<Order>()).ToList();

    public async Task<IList<Order>> GetByDeliveryDateRangeBetween(DateTime? deliveryFrom, DateTime? deliveryTo) =>
        (await repository.GetByDeliveryDateRangeBetween(deliveryFrom, deliveryTo) ?? new List<Order>()).ToList();
}
