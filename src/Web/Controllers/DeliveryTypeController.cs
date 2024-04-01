using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class DeliveryTypeController : BaseController<DeliveryType, DeliveryTypeService>
{
    public DeliveryTypeController(DeliveryTypeService service) : base(service)
    {
    }
}
