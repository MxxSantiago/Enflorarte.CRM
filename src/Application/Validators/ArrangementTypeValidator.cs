using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ArrangementTypeValidator : AbstractValidator<ArrangementType>
{
    public ArrangementTypeValidator()
    {
        RuleFor(arrangementType => arrangementType.Name)
            .NotEmpty()
            .MaximumLength(100);
    }
}
