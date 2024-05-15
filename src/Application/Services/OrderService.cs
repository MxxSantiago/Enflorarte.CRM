using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;

public class OrderService : BaseService<Order>
{
    public OrderService(IOrderDAO repository, IValidator<Order> validator)
        : base(repository, validator) { }
}
