﻿using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Enflorarte.CRM.Application;

public static class DependencyInjection
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
