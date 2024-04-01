﻿using System.Reflection;
using Enflorarte.CRM.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Enflorarte.CRM.Application;

public static class DependencyInjection
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

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
    }
}
