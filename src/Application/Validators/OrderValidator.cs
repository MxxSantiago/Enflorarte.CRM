using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(order => order.DeliveryDate)
            .NotEmpty();

        RuleFor(order => order.DeliveryFrom)
            .NotEmpty();

        RuleFor(order => order.IsPaid)
            .Must(x => x == false || x == true);

        RuleFor(order => order.WasDelivered)
            .Must(x => x == false || x == true);
    }
}
