using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(order => order.DeliveryDate)
            .NotEmpty().WithMessage("La fecha de entrega es requerida.");

        RuleFor(order => order.DeliveryFrom)
            .NotEmpty().WithMessage("La hora de inicio de la entrega es requerida.");

        RuleFor(order => order.IsPaid)
            .Must(x => x == false || x == true).WithMessage("El estado de pago debe ser verdadero o falso.");

        RuleFor(order => order.WasDelivered)
            .Must(x => x == false || x == true).WithMessage("El estado de entrega debe ser verdadero o falso.");
    }
}
