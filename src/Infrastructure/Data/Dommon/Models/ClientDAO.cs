using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class ClientDAO : BaseDAO<Client>, IClientDAO
{
    public ClientDAO(ApplicationDbContext context) : base(context) { }
}
