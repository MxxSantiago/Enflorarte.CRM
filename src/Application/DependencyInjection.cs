using System.Reflection;
using Enflorarte.CRM.Application.Services;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;

namespace Enflorarte.CRM.Application;

public static class DependencyInjection
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.AddFluentValidationAutoValidation();
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        services.AddScoped<BranchService>();
        services.AddScoped<DeliveryTypeService>();
        services.AddScoped<WrapperService>();
        services.AddScoped<WrapperVariantService>();
        services.AddScoped<FlowerService>();
        services.AddScoped<FlowerVariantService>();
        services.AddScoped<ClientService>();
        services.AddScoped<CommunicationTypeService>();
        services.AddScoped<ResponsibleService>();
        services.AddScoped<ArrangementService>();
        services.AddScoped<ArrangementTypeService>();
        services.AddScoped<OrderService>();
        services.AddScoped<TagService>();
    }
}
