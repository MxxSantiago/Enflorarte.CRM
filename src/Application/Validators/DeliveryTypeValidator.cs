using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class DeliveryTypeValidator : AbstractValidator<DeliveryType>
{
    public DeliveryTypeValidator()
    {
        RuleFor(type => type.Name)
            .NotEmpty()
            .MaximumLength(50);
    }
}
