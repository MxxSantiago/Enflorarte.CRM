using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ArrangementValidator : AbstractValidator<Arrangement>
{
    public ArrangementValidator()
    {
        RuleFor(arrangement => arrangement.Name)
            .NotEmpty().WithMessage("El nombre de el tipo de arreglo es requerido")
            .MaximumLength(100).WithMessage("La longitud del nombre de el tipo de arreglo tiene un maximo de 100 caracteres");

        RuleFor(arrangement => arrangement.IsTemplate)
            .Must(x => x == false || x == true).WithMessage("El valor de 'Plantilla' debe ser verdadero o falso.");

        RuleFor(arrangement => arrangement.ArrangementTypes)
            .NotEmpty().WithMessage("El tipo de arreglo es requerido.");

        RuleFor(arrangement => arrangement.WrapperVariants)
            .NotEmpty().WithMessage("Las variantes de envoltura son requeridas.");

        RuleFor(arrangement => arrangement.FlowerVariants)
            .NotEmpty().WithMessage("Las variantes de flores son requeridas.");

        RuleFor(arrangement => arrangement.Name)
            .NotEmpty().WithMessage("El nombre del arreglo es requerido.")
            .MaximumLength(100).WithMessage("La longitud del nombre del arreglo tiene un máximo de 100 caracteres.");

        RuleFor(arrangement => arrangement.IsAvailable)
            .Must(x => x == false || x == true).WithMessage("El valor de 'Disponible' debe ser verdadero o falso.");
    }
}
