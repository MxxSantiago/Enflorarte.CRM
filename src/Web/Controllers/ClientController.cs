using Enflorarte.CRM.Application.Services;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Web.Controllers;

public class ClientController : BaseController<Client, ClientService>
{
    public ClientController(ClientService service) : base(service)
    {
    }
}
