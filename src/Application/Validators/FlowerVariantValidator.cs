using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class FlowerVariantValidator : AbstractValidator<FlowerVariant>
{
    public FlowerVariantValidator()
    {
        RuleFor(variant => variant.Name)
            .NotEmpty().WithMessage("El nombre de la variante de flor es requerido.")
            .MaximumLength(50).WithMessage("La longitud del nombre de la variante de flor tiene un máximo de 50 caracteres.");
    }
}
