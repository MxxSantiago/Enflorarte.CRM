using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class FlowerVariantValidator : AbstractValidator<FlowerVariant>
{
    public FlowerVariantValidator()
    {
        RuleFor(variant => variant.Name)
            .NotEmpty()
            .MaximumLength(50);
    }
}
