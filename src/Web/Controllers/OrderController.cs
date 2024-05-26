using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Constants;
using Enflorarte.CRM.Domain.Entities;
using Enflorarte.CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Enflorarte.CRM.Web.Controllers;

public class OrderController : BaseController<Order, OrderService>
{
    protected override string RolesForCommands => $"{Roles.Administrator},{Roles.Operator}";

    private readonly OrderService _orderService;
    
    public OrderController(OrderService service, OrderService orderService, UserManager<ApplicationUser> userManager
    ) : base(service, userManager)
    {
        _orderService = orderService;
    }
    
    [HttpGet("GetDayOrders")]
    public async Task<ActionResult<IList<Order>>> GetDayOrders(DateTime day)
    {
        var orders = await _orderService.GetDayOrderAsync(day);
        return Ok(orders);
    }

    [HttpGet("GetWeekOrders")]
    public async Task<ActionResult<IList<Order>>> GetWeekOrders(DateTime week)
    {
        var orders = await _orderService.GetWeekOrderAsync(week);
        return Ok(orders);
    }

    [HttpGet("GetMonthOrders")]
    public async Task<ActionResult<IList<Order>>> GetMonthOrders(DateTime month)
    {
        var orders = await _orderService.GetMonthOrderAsync(month);
        return Ok(orders);
    }
}
