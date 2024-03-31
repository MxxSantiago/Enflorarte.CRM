using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;
public class CommunicationTypeDAO : BaseDAO<CommunicationType>, ICommunicationTypeDAO
{
    public CommunicationTypeDAO(ApplicationDbContext context) : base(context) { }
}
