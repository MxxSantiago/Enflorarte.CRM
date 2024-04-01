using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ClientValidator : AbstractValidator<Client>
{
    public ClientValidator()
    {
        RuleFor(client => client.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(client => client.PhoneNumber).NotEmpty().Matches(@"^\d{10}$");

        RuleFor(client => client.PreferredAddress)
            .MaximumLength(255);
    }
}
