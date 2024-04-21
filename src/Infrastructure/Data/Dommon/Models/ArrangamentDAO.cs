using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class ArrangamentDAO : BaseDAO<Arrangement>, IArrangamentDAO
{
    public ArrangamentDAO(ApplicationDbContext context) : base(context) { }
}
