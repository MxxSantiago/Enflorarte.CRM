using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class BranchValidator : AbstractValidator<Branch>
{
    public BranchValidator()
    {
        RuleFor(branch => branch.Name)
            .NotEmpty()
            .MaximumLength(100);
    }
}
