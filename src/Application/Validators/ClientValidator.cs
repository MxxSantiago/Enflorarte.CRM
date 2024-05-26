using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ClientValidator : AbstractValidator<Client>
{
    public ClientValidator()
    {
        RuleFor(client => client.Name)
            .NotEmpty().WithMessage("El nombre del cliente es requerido.")
            .MaximumLength(100).WithMessage("La longitud del nombre del cliente tiene un máximo de 100 caracteres.");

        RuleFor(client => client.PhoneNumber).NotEmpty().WithMessage("El número de teléfono es requerido.").Matches(@"^\d{10}$").WithMessage("El número de teléfono debe tener exactamente 10 dígitos.");

        RuleFor(client => client.Address)
            .MaximumLength(255).WithMessage("La longitud de la dirección del cliente tiene un máximo de 255 caracteres.");
    }
}
