using System.Text.RegularExpressions;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class TagValidator : AbstractValidator<Tag>
{
    public TagValidator()
    {
        RuleFor(tag => tag.Name).MaximumLength(30)
            .NotEmpty();
        
        RuleFor(tag => tag.Color).Length(7)
            .NotEmpty()
            .Matches(new Regex("^#[0-9A-Fa-f]{6}$"))
            .WithMessage("Color must be a 7-character hexadecimal value");

    }
}
