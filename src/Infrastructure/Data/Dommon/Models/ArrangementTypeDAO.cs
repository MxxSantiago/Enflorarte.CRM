using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class ArrangamentTypeDAO : BaseDAO<ArrangementType>, IArrangamentTypeDAO
{
    public ArrangamentTypeDAO(ApplicationDbContext context) : base(context) { }
}
