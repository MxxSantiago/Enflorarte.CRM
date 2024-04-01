using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;

public class ResponsibleService : BaseService<Responsible>
{
    public ResponsibleService(IResponsibleDAO repository, IValidator<Responsible> validator)
        : base(repository, validator) { }
}
