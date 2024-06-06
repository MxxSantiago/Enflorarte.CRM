using Enflorarte.CRM.Application.Common.Interfaces;
using Enflorarte.CRM.Infrastructure.Data;
using Enflorarte.CRM.Web.Controllers;
using Enflorarte.CRM.Web.Controllers.AuthValidator;
using Enflorarte.CRM.Web.Services;
using FluentValidation;

namespace Enflorarte.CRM.Web;

public static class DependencyInjection
{
    public static void AddWebServices(this IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddScoped<IUser, CurrentUser>();
        services.AddTransient<IValidator<AuthController.RegisterCommand>, RegisterCommandValidator>();
        services.AddTransient<IValidator<AuthController.UpdateCommand>, UpdateCommandValidator>();

        services.AddHttpContextAccessor();

        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();

        services.AddRazorPages();

        services.AddEndpointsApiExplorer();

        services.AddOpenApiDocument((configure, sp) =>
        {
            configure.Title = "Enflorarte.CRM API";
        });
    }
}
