using System.Text.RegularExpressions;
using Enflorarte.CRM.Domain.Entities;

namespace Enflorarte.CRM.Application.Validators;

public class TagValidator : AbstractValidator<Tag>
{
    public TagValidator()
    {
        RuleFor(tag => tag.Name).MaximumLength(30).WithMessage("La longitud del nombre de la etiqueta tiene un máximo de 30 caracteres.")
            .NotEmpty().WithMessage("El nombre de la etiqueta es requerido.");
        
        RuleFor(tag => tag.Color).Length(7).WithMessage("La longitud del color debe ser de 7 caracteres.")
            .NotEmpty().WithMessage("El color de la etiqueta es requerido.")
            .Matches(new Regex("^#[0-9A-Fa-f]{6}$")).WithMessage("El color debe ser un valor hexadecimal de 7 caracteres que comience con #.");
            
    }
}
