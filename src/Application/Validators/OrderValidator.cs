using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(order => order.DeliveryDate).NotEmpty();
        RuleFor(order => order.DeliveryFrom).NotEmpty();
        RuleFor(order => order.DeliveryTo).NotEmpty();
        RuleFor(order => order.OrderDate).NotEmpty();
        RuleFor(order => order.DeliveryType).NotEmpty().MaximumLength(50);
        RuleFor(order => order.Address).NotEmpty();
        RuleFor(order => order.OrderGenerated).NotEmpty();
        RuleFor(order => order.CompletionPrice).NotEmpty();
        RuleFor(order => order.ShippingPrice).NotEmpty();
        RuleFor(order => order.IsPaid).NotEmpty();
        RuleFor(order => order.WasDelivered).NotEmpty();
        RuleFor(order => order.BranchId).NotEmpty();
        RuleFor(order => order.RecipientName).NotEmpty().MaximumLength(100);
        RuleFor(order => order.MoneyPaid).NotEmpty().InclusiveBetween(0, decimal.MaxValue);
        RuleFor(order => order.CompletionPrice).NotEmpty().InclusiveBetween(0, decimal.MaxValue);
        RuleFor(order => order.ShippingPrice).NotEmpty().InclusiveBetween(0, decimal.MaxValue);
        RuleFor(order => order.OrderPrice).NotEmpty().InclusiveBetween(0, decimal.MaxValue);
        RuleFor(order => order.RecipientCellPhoneNumber).NotEmpty().Matches(@"^\d{10}$");
        RuleFor(order => order.ReferenceImage).NotEmpty().Matches(@"^(http|https)://.*$");
        RuleFor(order => order.ResultImage).Matches(@"^(http|https)://.*$");

        RuleFor(order => order)
            .Custom((order, context) =>
            {
                if (order.DeliveryFrom >= order.DeliveryTo)
                {
                    context.AddFailure("DeliveryFrom", "Delivery From date must be before Delivery To date.");
                }
            });
    }
}
