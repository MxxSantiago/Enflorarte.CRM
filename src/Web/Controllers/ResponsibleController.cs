using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class ResponsibleController : BaseController<Responsible, ResponsibleService>
{
    public ResponsibleController(ResponsibleService service) : base(service)
    {
    }
}
