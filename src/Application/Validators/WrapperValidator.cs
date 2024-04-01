using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class WrapperValidator : AbstractValidator<Wrapper>
{
    public WrapperValidator()
    {
        RuleFor(wrapper => wrapper.Name)
            .NotEmpty()
            .MaximumLength(50);
    }
}
