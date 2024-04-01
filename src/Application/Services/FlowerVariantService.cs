using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class FlowerVariantService : BaseService<FlowerVariant>
{
    public FlowerVariantService(IFlowerVariantDAO repository, IValidator<FlowerVariant> validator)
        : base(repository, validator) { }
}
