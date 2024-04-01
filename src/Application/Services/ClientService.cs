using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class ClientService : BaseService<Client>
{
    public ClientService(IClientDAO repository, IValidator<Client> validator)
        : base(repository, validator) { }
}
