using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class OrderController: BaseController<Order, OrderService>
{
    private readonly OrderService _service;

    public OrderController(OrderService service) : base(service) =>
        _service = service;
    
    /*
    [HttpGet("branch/{branchId:int}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetByBranchId(int branchId) =>
        await _service.GetByBranchId(branchId);

    [HttpGet("tags")]
    public async Task<ActionResult<IList<Order>>> GetByTags(IEnumerable<int> tagsIds) =>
        await _service.GetByTags(tagsIds);

    [HttpGet("responsible/{responsibleId:int}")]
    public async Task<ActionResult<IList<Order>>> GetByResponsible(int responsibleId) =>
        await _service.GetByResponsible(responsibleId);

    [HttpGet("delivery-date-between")]
    public async Task<ActionResult<IList<Order>>> GetWithDeliveryDateBetween(DateTime? startDate, DateTime? endDate) =>
        await _service.GetWithDeliveryDateBetween(startDate, endDate);

    [HttpGet("delivery-date-range-between")]
    public async Task<ActionResult<IList<Order>>> GetByDeliveryDateRangeBetween(DateTime? deliveryFrom,
        DateTime? deliveryTo) =>
        await _service.GetByDeliveryDateRangeBetween(deliveryFrom, deliveryTo);
    */
}
