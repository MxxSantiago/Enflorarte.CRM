using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class BranchValidator : AbstractValidator<Branch>
{
    public BranchValidator()
    {
        RuleFor(branch => branch.Name)
            .NotEmpty().WithMessage("El nombre de la sucursal es requerido.")
            .MaximumLength(100).WithMessage("La longitud del nombre de la sucursal tiene un máximo de 100 caracteres.");
    }
}
