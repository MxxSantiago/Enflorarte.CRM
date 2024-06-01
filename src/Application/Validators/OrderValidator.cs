using Enflorarte.CRM.Domain.Entities;
using FluentValidation;

namespace Enflorarte.CRM.Application.Validators;

public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(order => order.ReferenceImage)
            .MaximumLength(255).WithMessage("La longitud de la imagen de referencia tiene un máximo de 255 caracteres.");

        RuleFor(order => order.Address)
            .MaximumLength(255).WithMessage("La longitud de la dirección tiene un máximo de 255 caracteres.");

        RuleFor(order => order.Description)
            .MaximumLength(255).WithMessage("La longitud de la descripción tiene un máximo de 255 caracteres.");

        RuleFor(order => order.DeliveryDate)
            .NotNull().WithMessage("La fecha de entrega es requerida.")
            .NotEmpty().WithMessage("La fecha de entrega es requerida.");

        RuleFor(order => order.OrderDate)
            .NotNull().WithMessage("La fecha de entrega es requerida.")
            .NotEmpty().WithMessage("La fecha del pedido es requerida.");

        RuleFor(order => order.RecipientName)
            .MaximumLength(255).WithMessage("La longitud del nombre del destinatario tiene un máximo de 255 caracteres.");

        RuleFor(order => order.RecipientCellphoneNumber)
            .MaximumLength(255).WithMessage("La longitud del número de teléfono celular del destinatario tiene un máximo de 255 caracteres.");
    }
}
