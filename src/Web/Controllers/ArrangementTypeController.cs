using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;
using Enflorarte.CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace Enflorarte.CRM.Web.Controllers;

public class ArrangementTypeController : BaseController<ArrangementType, ArrangementTypeService>
{
    public ArrangementTypeController(ArrangementTypeService service, UserManager<ApplicationUser> userManager
    ) : base(service, userManager)
    {
    }
}
