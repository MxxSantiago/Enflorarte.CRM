using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class DeliveryTypeValidator : AbstractValidator<DeliveryType>
{
    public DeliveryTypeValidator()
    {
        RuleFor(type => type.Name)
            .NotEmpty().WithMessage("El nombre del tipo de entrega es requerido.")
            .MaximumLength(50).WithMessage("La longitud del nombre del tipo de entrega tiene un máximo de 50 caracteres.");
    }
}
