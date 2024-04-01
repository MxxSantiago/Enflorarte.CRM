using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class FlowerVariantController : BaseController<FlowerVariant, FlowerVariantService>
{
    public FlowerVariantController(FlowerVariantService service) : base(service)
    {
    }
}
