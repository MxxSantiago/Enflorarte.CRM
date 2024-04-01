using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class CommunicationTypeService : BaseService<CommunicationType>
{
    public CommunicationTypeService(ICommunicationTypeDAO repository, IValidator<CommunicationType> validator)
        : base(repository, validator) { }
}
