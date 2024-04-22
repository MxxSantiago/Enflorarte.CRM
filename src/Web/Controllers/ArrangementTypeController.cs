using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class ArrangementTypeController : BaseController<ArrangementType, ArrangementTypeService>
{
    public ArrangementTypeController(ArrangementTypeService service) : base(service)
    {
    }
}
