using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;

public class BranchService : BaseService<Branch>
{
    public BranchService(IBranchDAO repository, IValidator<Branch> validator) : base(repository, validator) { }
}
