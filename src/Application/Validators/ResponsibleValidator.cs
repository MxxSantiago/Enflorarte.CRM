using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class ResponsibleValidator : AbstractValidator<Responsible>
{
    public ResponsibleValidator()
    {
        RuleFor(responsible => responsible.Name)
            .NotEmpty()
            .MaximumLength(100);
    }
}
