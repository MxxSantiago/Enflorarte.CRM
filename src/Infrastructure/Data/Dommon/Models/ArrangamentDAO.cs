using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class ArrangementDAO : BaseDAO<Arrangement>, IArrangementDAO
{
    public ArrangementDAO(ApplicationDbContext context) : base(context) { }
}
