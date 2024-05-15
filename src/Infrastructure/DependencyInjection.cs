using Enflorarte.CRM.Application.Common.Interfaces;
using Enflorarte.CRM.Infrastructure.Data;
using Enflorarte.CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Enflorarte.CRM.Application.Common.Interfaces.DAOs;
using Enflorarte.CRM.Infrastructure.Data.Dommon.Models;
using Enflorarte.CRM.Infrastructure.Data.Seeder;

namespace Enflorarte.CRM.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            options.UseSqlServer(connectionString);
        });

        services.AddScoped<ApplicationDbContext>();

        services.AddScoped<DatabaseInitializer>();

        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddSingleton(TimeProvider.System);
        services.AddTransient<IIdentityService, IdentityService>();
        
        services.AddAuthorization();
        
        services.AddScoped<IBranchDAO, BranchDAO>();
        services.AddScoped<IDeliveryTypeDAO, DeliveryTypeDAO>();
        services.AddScoped<IWrapperDAO, WrapperDAO>();
        services.AddScoped<IWrapperVariantDAO, WrapperVariantDAO>();
        services.AddScoped<IFlowerDAO, FlowerDAO>();
        services.AddScoped<IFlowerVariantDAO, FlowerVariantDAO>();
        services.AddScoped<IClientDAO, ClientDAO>();
        services.AddScoped<ICommunicationTypeDAO, CommunicationTypeDAO>();
        services.AddScoped<IResponsibleDAO, ResponsibleDAO>();
        services.AddScoped<IArrangementTypeDAO, ArrangementTypeDAO>();
        services.AddScoped<IArrangementDAO, ArrangementDAO>();
        services.AddScoped<IOrderDAO, OrderDAO>();
    }
}
