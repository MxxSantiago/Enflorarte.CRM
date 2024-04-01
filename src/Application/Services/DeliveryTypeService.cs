using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class DeliveryTypeService : BaseService<DeliveryType>
{
    public DeliveryTypeService(IDeliveryTypeDAO repository, IValidator<DeliveryType> validator)
        : base(repository, validator) { }
}
