using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;


public class WrapperService : BaseService<Wrapper>
{
    public WrapperService(IWrapperDAO repository, IValidator<Wrapper> validator)
        : base(repository, validator) { }
}

