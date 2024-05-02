using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ArrangementValidator : AbstractValidator<Arrangement>
{
    public ArrangementValidator()
    {
        RuleFor(arrangement => arrangement.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(arrangement => arrangement.IsTemplate)
            .Must(x => x == false || x == true);

        RuleFor(arrangement => arrangement.ArrangementTypes)
            .NotEmpty();

        RuleFor(arrangement => arrangement.WrapperVariants)
            .NotEmpty();

        RuleFor(arrangement => arrangement.FlowerVariants)
            .NotEmpty();

        RuleFor(arrangement => arrangement.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(arrangement => arrangement.IsAvailable)
            .Must(x => x == false || x == true);
    }
}
