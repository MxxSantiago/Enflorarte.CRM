using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data.Dommon.Models;

public class BranchDAO : BaseDAO<Branch>, IBranchDAO
{
    public BranchDAO(ApplicationDbContext context) : base(context) { }
}
