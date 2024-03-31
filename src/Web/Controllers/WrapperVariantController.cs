using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class WrapperVariantController : BaseController<WrapperVariant, WrapperVariantService>
{
    public WrapperVariantController(WrapperVariantService service) : base(service)
    {
    }
}
