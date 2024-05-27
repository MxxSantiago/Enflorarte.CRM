using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class CommunicationTypeValidator : AbstractValidator<CommunicationType>
{
    public CommunicationTypeValidator()
    {
        RuleFor(type => type.Name)
            .NotEmpty().WithMessage("El nombre del tipo de comunicacion es requerido.")
            .MaximumLength(50).WithMessage("La longitud del nombre del tipo de comunicacion tiene un máximo de 50 caracteres.");
    }
}
