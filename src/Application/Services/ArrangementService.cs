using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class ArrangementService : BaseService<Arrangement>
{
    public ArrangementService(IArrangementDAO repository, IValidator<Arrangement> validator)
        : base(repository, validator) { }
}
