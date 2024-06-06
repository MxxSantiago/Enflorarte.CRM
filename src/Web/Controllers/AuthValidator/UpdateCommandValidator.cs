using FluentValidation;

namespace Enflorarte.CRM.Web.Controllers.AuthValidator;

public class UpdateCommandValidator : AbstractValidator<AuthController.UpdateCommand>
{
    public UpdateCommandValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty().WithMessage("El correo electrónico es requerido.")
            .EmailAddress().WithMessage("El correo electrónico no es válido.");

        RuleFor(command => command.UserName)
            .NotEmpty().WithMessage("El nombre de usuario es requerido.")
            .Length(3, 20).WithMessage("El nombre de usuario debe tener entre 3 y 20 caracteres.");

        RuleFor(command => command.Password)
            .NotEmpty().WithMessage("La contraseña es requerida.")
            .MinimumLength(6).WithMessage("La contraseña debe tener al menos 6 caracteres.")
            .Matches("[A-Z]").WithMessage("La contraseña debe contener al menos una letra mayúscula.")
            .Matches("[^a-zA-Z0-9]").WithMessage("La contraseña debe contener al menos un carácter especial.");
    }
}
