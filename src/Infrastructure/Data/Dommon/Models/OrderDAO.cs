using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class OrderDAO : BaseDAO<Order>, IOrderDAO
{
    public OrderDAO(ApplicationDbContext context) : base(context) { }

    public async Task<IEnumerable<Order>?> GetByBranchId(int branchId) =>
        await _context.Order.Where(x => x.BranchId == branchId).ToListAsync();

    public async Task<IEnumerable<Order>?> GetByResponsible(int responsibleId) =>
        await _context.Order.Where(x => x.ResponsibleId == responsibleId).ToListAsync();

    public async Task<IEnumerable<Order>?> GetWithDeliveryDateBetween(DateTime? startDate, DateTime? endDate) =>
        await _context.Order.Where(x => x.DeliveryDate >= startDate && x.DeliveryDate <= endDate).ToListAsync();

    public async Task<IEnumerable<Order>?> GetByDeliveryDateRangeBetween(DateTime? deliveryFrom, DateTime? deliveryTo)
    {
        var query = _context.Order.AsQueryable();

        if (deliveryFrom.HasValue)
        {
            query = query.Where(x => x.DeliveryFrom >= deliveryFrom.Value);
        }

        if (deliveryTo.HasValue)
        {
            query = query.Where(x => x.DeliveryTo <= deliveryTo.Value);
        }

        return await query.ToListAsync();
    }    
}
