using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class WrapperVariantValidator : AbstractValidator<WrapperVariant>
{
    public WrapperVariantValidator()
    {
        RuleFor(variant => variant.Name)
            .NotEmpty()
            .MaximumLength(50);
    }
}
