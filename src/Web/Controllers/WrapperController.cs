using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class WrapperController : BaseController<Wrapper, WrapperService>
{
    public WrapperController(WrapperService service) : base(service)
    {
    }
}
