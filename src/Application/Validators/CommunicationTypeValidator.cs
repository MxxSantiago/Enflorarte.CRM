using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class CommunicationTypeValidator : AbstractValidator<CommunicationType>
{
    public CommunicationTypeValidator()
    {
        RuleFor(type => type.Name)
            .NotEmpty()
            .MaximumLength(50);
    }
}
