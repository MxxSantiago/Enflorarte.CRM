using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ArrangementTypeValidator : AbstractValidator<ArrangementType>
{
    public ArrangementTypeValidator()
    {
        RuleFor(arrangementType => arrangementType.Name)
            .NotEmpty().WithMessage("El nombre de el tipo de arreglo es requerido")
            .MaximumLength(100).WithMessage("La longitud del nombre de el tipo de arreglo tiene un maximo de 100 caracteres");
    }
}
