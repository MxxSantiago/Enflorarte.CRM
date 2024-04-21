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
            .NotEmpty();

        RuleFor(arrangement => arrangement.ArrangementType)
            .NotEmpty();

        RuleFor(arrangement => arrangement.Tags)
            .NotEmpty();

        RuleFor(arrangement => arrangement.WrapperVariant)
            .NotEmpty();

        RuleFor(arrangement => arrangement.FlowerVariant)
            .NotEmpty();

        RuleFor(arrangement => arrangement.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(arrangement => arrangement.IsAvailable)
            .NotEmpty();


    }
}
