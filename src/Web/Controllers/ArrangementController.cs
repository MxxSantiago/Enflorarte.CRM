using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class ArrangementController : BaseController<Arrangement, ArrangementService>
{
    public ArrangementController(ArrangementService service) : base(service)
    {
    }
}
