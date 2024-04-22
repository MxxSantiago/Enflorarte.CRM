using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class ArrangementTypeDAO : BaseDAO<ArrangementType>, IArrangementTypeDAO
{
    public ArrangementTypeDAO(ApplicationDbContext context) : base(context) { }
}
