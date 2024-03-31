using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;

public class WrapperVariantService : BaseService<WrapperVariant>
{
    public WrapperVariantService(IWrapperVariantDAO repository, IValidator<WrapperVariant> validator)
        : base(repository, validator) { }
}
