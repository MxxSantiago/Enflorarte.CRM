using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class ResponsibleDAO : BaseDAO<Responsible>, IResponsibleDAO
{
    public ResponsibleDAO(ApplicationDbContext context) : base(context) { }
}
