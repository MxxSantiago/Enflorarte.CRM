using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ResponsibleValidator : AbstractValidator<Responsible>
{
    public ResponsibleValidator()
    {
        RuleFor(responsible => responsible.Name)
            .NotEmpty().WithMessage("El nombre del responsable es requerido.")
            .MaximumLength(100).WithMessage("La longitud del nombre del responsable tiene un máximo de 100 caracteres.");
    }
}
