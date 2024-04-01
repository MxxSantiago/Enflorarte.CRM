using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class FlowerValidator : AbstractValidator<Flower>
{
    public FlowerValidator()
    {
        RuleFor(flower => flower.Name)
            .NotEmpty()
            .MaximumLength(50);
    }
}
