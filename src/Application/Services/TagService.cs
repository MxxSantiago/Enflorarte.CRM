using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Application.Common.Models;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Services;

public class TagService : BaseService<Tag>
{
    public TagService(ITagDAO repository, IValidator<Tag> validator)
        : base(repository, validator) { }
}
