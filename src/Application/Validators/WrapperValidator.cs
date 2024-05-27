using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class WrapperValidator : AbstractValidator<Wrapper>
{
    public WrapperValidator()
    {
        RuleFor(wrapper => wrapper.Name)
            .NotEmpty().WithMessage("El nombre del envoltura es requerido.")
            .MaximumLength(50).WithMessage("La longitud del nombre del envoltorio tiene un máximo de 50 caracteres.");
    }
}
