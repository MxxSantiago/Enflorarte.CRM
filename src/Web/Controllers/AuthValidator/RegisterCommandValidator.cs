using FluentValidation;

namespace Enflorarte.CRM.Web.Controllers.AuthValidator;

public class RegisterCommandValidator : AbstractValidator<AuthController.RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty().WithMessage("El correo electrónico es requerido.")
            .EmailAddress().WithMessage("El correo electrónico no es válido.");

        RuleFor(command => command.UserName)
            .NotEmpty().WithMessage("El nombre de usuario es requerido.")
            .Length(3, 20).WithMessage("El nombre de usuario debe tener entre 3 y 20 caracteres.");

        RuleFor(command => command.Roles)
            .NotEmpty().WithMessage("Al menos un rol es requerido.");
    }
}
