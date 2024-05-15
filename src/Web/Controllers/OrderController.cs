using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class OrderController : BaseController<Order, OrderService>
{
    public OrderController(OrderService service) : base(service)
    {
    }
}
