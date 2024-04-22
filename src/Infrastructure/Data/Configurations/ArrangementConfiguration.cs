using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Enflorarte.CRM.Infrastructure.Data.Configurations;

public class ArrangementConfiguration : IEntityTypeConfiguration<Arrangement>
{
    public void Configure(EntityTypeBuilder<Arrangement> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Name).HasMaxLength(100).IsRequired();
        builder.Property(p => p.IsTemplate).IsRequired();
        builder.Property(p => p.Tags).HasMaxLength(255);
        builder.Property(p => p.Extras).HasMaxLength(255);
        builder.Property(p => p.ReferenceImage).HasMaxLength(255);
        builder.Property(p => p.IsAvailable).IsRequired();

        builder.HasMany(p => p.WrapperVariants)
            .WithOne()
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(p => p.FlowerVariants)
            .WithOne()
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(p => p.ArrangementTypes)
            .WithOne()
            .OnDelete(DeleteBehavior.Restrict);
    }
}
