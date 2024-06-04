using FluentValidation;

namespace Enflorarte.CRM.Domain.Entities
{
    public class OrderValidator : AbstractValidator<Order>
    {
        public OrderValidator()
        {
            RuleFor(order => order.ReferenceImage)
                .MaximumLength(255).WithMessage("La longitud de la imagen de referencia tiene un máximo de 255 caracteres.");

            RuleFor(order => order.Address)
                .MaximumLength(255).WithMessage("La longitud de la dirección tiene un máximo de 255 caracteres.")
                .NotEmpty().WithMessage("La dirección es requerida.");

            RuleFor(order => order.Description)
                .MaximumLength(255).WithMessage("La longitud de la descripción tiene un máximo de 255 caracteres.");

            RuleFor(order => order.DeliveryDate)
                .NotNull().WithMessage("La fecha de entrega es requerida.")
                .NotEmpty().WithMessage("La fecha de entrega es requerida.")
                .GreaterThanOrEqualTo(order => order.OrderDate).WithMessage("La fecha de entrega no puede ser menor a la fecha del pedido.");


            RuleFor(order => order.OrderDate)
                .NotNull().WithMessage("La fecha del pedido es requerida.")
                .NotEmpty().WithMessage("La fecha del pedido es requerida.");

            RuleFor(order => order.RecipientName)
                .MaximumLength(255).WithMessage("La longitud del nombre del destinatario tiene un máximo de 255 caracteres.")
                .NotEmpty().WithMessage("El nombre del destinatario es requerido.");

            RuleFor(order => order.RecipientCellphoneNumber)
                .NotNull().WithMessage("El número de teléfono celular del destinatario es requerido.")
                .Matches(@"^\d{10}$").WithMessage("El número de teléfono celular del destinatario debe contener exactamente 10 dígitos y no puede contener letras.")
                .NotEmpty().WithMessage("El número de teléfono celular del destinatario es requerido.");

            RuleFor(order => order.OrderPrice)
                .NotNull().WithMessage("El precio del pedido es requerido.")
                .GreaterThan(0).WithMessage("El precio del pedido debe ser mayor a cero.");

                   RuleFor(order => order.Responsible)
                .NotEmpty().WithMessage("La lista de responsables no puede estar vacía.");

            RuleFor(order => order.DeliveryType)
                .NotEmpty().WithMessage("La lista de tipos de entrega no puede estar vacía.");

            RuleFor(order => order.Arrangement)
                .NotEmpty().WithMessage("La lista de arreglos no puede estar vacía.");

            RuleFor(order => order.CommunicationType)
                .NotEmpty().WithMessage("La lista de tipos de comunicación no puede estar vacía.");

            RuleFor(order => order.Branch)
                .NotEmpty().WithMessage("La lista de sucursales no puede estar vacía.");

            RuleFor(order => order.Tags)
                .NotEmpty().WithMessage("La lista de etiquetas no puede estar vacía.");

                 RuleFor(order => order.OrderStatus)
                .NotNull().WithMessage("El estado del pedido es requerido.");

            RuleFor(order => order.PaymentStatus)
                .NotNull().WithMessage("El estado del pago es requerido.");
        }
    }
}
