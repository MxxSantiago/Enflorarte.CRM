using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class CommunicationTypeController : BaseController<CommunicationType, CommunicationTypeService>
{
    public CommunicationTypeController(CommunicationTypeService service) : base(service)
    {
    }
}
