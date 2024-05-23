using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Enflorarte.CRM.Web.Controllers;

public class OrderController : BaseController<Order, OrderService>
{
    public OrderController(OrderService service) : base(service)
    {
        [HttpGet("GetDayOrders")]
        async Task<IActionResult> GetDayOrders(DateTime day)
        {
            var orders = await service.GetDayOrderAsync(day);
            return Ok(orders);
        }

        [HttpGet("GetWeekOrders")]
        async Task<IActionResult> GetWeekOrders(DateTime week)
        {
            var orders = await service.GetWeekOrderAsync(week);
            return Ok(orders);
        }

        [HttpGet("GetMonthOrders")]
        async Task<IActionResult> GetMonthOrders(DateTime month)
        {
            var orders = await service.GetMonthOrderAsync(month);
            return Ok(orders);
        }
    }
}
