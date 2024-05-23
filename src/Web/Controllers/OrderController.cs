using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Enflorarte.CRM.Web.Controllers;

public class OrderController : BaseController<Order, OrderService>
{
    public OrderController(OrderService service) : base(service)
    {
        [HttpGet("GetOrdersByDay")]
        async Task<IActionResult> GetOrdersByDeliveryDate(DateTime day)
        {
            var orders = await service.GetDayOrderAsync(day);
            return Ok(orders);
        }
    }
}
