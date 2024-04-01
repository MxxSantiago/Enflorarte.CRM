using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class FlowerService : BaseService<Flower>
{
    public FlowerService(IFlowerDAO repository, IValidator<Flower> validator)
        : base(repository, validator) { }
}
