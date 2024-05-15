using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class OrderDAO : BaseDAO<Order>, IOrderDAO
{
    public OrderDAO(ApplicationDbContext context) : base(context) { }
}
