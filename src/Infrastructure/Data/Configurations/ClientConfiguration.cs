using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Enflorarte.CRM.Infrastructure.Data.Configurations;

public class ClientConfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Name).HasMaxLength(100).IsRequired();
        builder.Property(p => p.PreferredAddress).HasMaxLength(255);
        builder.Property(p => p.PhoneNumber).HasMaxLength(15);

        builder.HasOne(p => p.PreferredCommunicationType)
            .WithMany()
            .HasForeignKey(p => p.PreferredCommunicationTypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}