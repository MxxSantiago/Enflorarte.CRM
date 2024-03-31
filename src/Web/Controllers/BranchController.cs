using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class BranchController : BaseController<Branch, BranchService>
{
    public BranchController(BranchService service) : base(service)
    {
    }
}
