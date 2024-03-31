using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class FlowerController : BaseController<Flower, FlowerService>
{
    public FlowerController(FlowerService service) : base(service)
    {
    }
}
