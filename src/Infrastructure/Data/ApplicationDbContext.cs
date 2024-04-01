using System.Reflection;
using Enflorarte.CRM.Domain.Entities;
using Enflorarte.CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Enflorarte.CRM.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Branch> Branch => Set<Branch>();
    public DbSet<Client> Client => Set<Client>();
    public DbSet<CommunicationType> CommunicationType => Set<CommunicationType>();
    public DbSet<DeliveryType> DeliveryType => Set<DeliveryType>();
    public DbSet<Flower> Flower => Set<Flower>();
    public DbSet<FlowerVariant> FlowerVariant => Set<FlowerVariant>();
    public DbSet<Responsible> Responsible => Set<Responsible>();
    public DbSet<Wrapper> Wrapper => Set<Wrapper>();
    public DbSet<WrapperVariant> WrapperVariant => Set<WrapperVariant>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
