using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class TagController : BaseController<Tag, TagService>
{
    public TagController(TagService service) : base(service)
    {
    }
}
