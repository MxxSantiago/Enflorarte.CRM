using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Constants;
using Enflorarte.CRM.Domain.Entities;
using Enflorarte.CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace Enflorarte.CRM.Web.Controllers;

public class TagController : BaseController<Tag, TagService>
{
    protected override string RolesForCommands => $"{Roles.Administrator},{Roles.Operator}";

    public TagController(TagService service, UserManager<ApplicationUser> userManager
    ) : base(service, userManager)
    {
    }
}
