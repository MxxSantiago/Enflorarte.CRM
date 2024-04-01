using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Enflorarte.CRM.Infrastructure.Data.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.HasOne(p => p.Responsible)
            .WithMany()
            .HasForeignKey(p => p.ResponsibleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(p => p.Branch)
            .WithMany()
            .HasForeignKey(p => p.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(p => p.CommunicationType)
            .WithMany()
            .HasForeignKey(p => p.CommunicationTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(p => p.DeliveryDate).IsRequired();
        builder.Property(p => p.DeliveryFrom).IsRequired();
        builder.Property(p => p.DeliveryTo).IsRequired();
        builder.Property(p => p.OrderDate).IsRequired();
        builder.Property(p => p.DeliveryType).HasMaxLength(50).IsRequired();
        builder.Property(p => p.Description).HasMaxLength(1000);
        builder.Property(p => p.OrderGenerated).IsRequired();
        builder.Property(p => p.IsPaid).IsRequired();
        builder.Property(p => p.WasDelivered).IsRequired();
        builder.Property(p => p.RecipientName).HasMaxLength(100);
        builder.Property(p => p.MoneyPaid).HasPrecision(18, 2).IsRequired();
        builder.Property(p => p.OrderPrice).HasPrecision(18, 2).IsRequired();
        builder.Property(p => p.CompletionPrice).HasPrecision(18, 2).IsRequired();
        builder.Property(p => p.ShippingPrice).HasPrecision(18, 2).IsRequired();
        builder.Property(p => p.RecipientCellPhoneNumber).HasMaxLength(15);
        builder.Property(p => p.ReferenceImage).HasMaxLength(2000);
        builder.Property(p => p.ResultImage).HasMaxLength(2000);
    }
}
