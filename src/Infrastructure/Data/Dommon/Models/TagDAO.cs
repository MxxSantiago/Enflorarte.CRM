using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class TagDAO : BaseDAO<Tag>, ITagDAO
{
    public TagDAO(ApplicationDbContext context) : base(context) { }
}
