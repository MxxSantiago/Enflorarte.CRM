using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class ArrangementTypeService : BaseService<ArrangementType>
{
    public ArrangementTypeService(IArrangementTypeDAO repository, IValidator<ArrangementType> validator)
        : base(repository, validator) { }
}
