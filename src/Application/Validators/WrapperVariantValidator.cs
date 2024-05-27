using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class WrapperVariantValidator : AbstractValidator<WrapperVariant>
{
    public WrapperVariantValidator()
    {
        RuleFor(variant => variant.Name)
            .NotEmpty().WithMessage("El nombre de la variante de envoltorio es requerido.")
            .MaximumLength(50).WithMessage("La longitud del nombre de la variante de envoltorio tiene un máximo de 50 caracteres.");
    }
}
