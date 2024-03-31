using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Enflorarte.CRM.Infrastructure.Data.Configurations;

public class FlowerVariantConfiguration : IEntityTypeConfiguration<FlowerVariant>
{
    public void Configure(EntityTypeBuilder<FlowerVariant> builder)
    {
        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Name).HasMaxLength(50).IsRequired();

        // One-to-one relationship
        builder.HasOne(p => p.Flower)
            .WithMany()
            .HasForeignKey(p => p.FlowerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
