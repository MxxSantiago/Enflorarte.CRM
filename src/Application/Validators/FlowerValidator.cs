using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class FlowerValidator : AbstractValidator<Flower>
{
    public FlowerValidator()
    {
        RuleFor(flower => flower.Name)
            .NotEmpty().WithMessage("El nombre de la flor es requerido.")
            .MaximumLength(50).WithMessage("La longitud del nombre de la flor tiene un máximo de 50 caracteres.");
    }
}
