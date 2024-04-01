using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Enflorarte.CRM.Infrastructure.Data.Configurations;

public class WrapperVariantConfiguration : IEntityTypeConfiguration<WrapperVariant>
{
    public void Configure(EntityTypeBuilder<WrapperVariant> builder)
    {
        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p =>  p.Name).HasMaxLength(50).IsRequired();

        // One-to-one relationship
        builder.HasOne(p => p.Wrapper)
            .WithMany()
            .HasForeignKey(p => p.WrapperId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
