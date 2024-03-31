using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;
public class WrapperDAO : BaseDAO<Wrapper>, IWrapperDAO
{
    public WrapperDAO(ApplicationDbContext context) : base(context) { }
}
