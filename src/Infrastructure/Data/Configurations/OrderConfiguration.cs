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

        builder.Property(p => p.ReferenceImage).HasMaxLength(255);
        builder.Property(p => p.ResultImage).HasMaxLength(255);
        builder.Property(p => p.Address).HasMaxLength(255);
        builder.Property(p => p.Description).HasMaxLength(255);
        builder.Property(p => p.DeliveryDate).IsRequired();
        builder.Property(p => p.DeliveryFrom).IsRequired();
        builder.Property(p => p.DeliveryUntil).IsRequired();
        builder.Property(p => p.OrderDate).IsRequired();
        builder.Property(p => p.CommandGenerated).IsRequired();
        builder.Property(p => p.OrderPrice).IsRequired();
        builder.Property(p => p.RealizationPrice).IsRequired();
        builder.Property(p => p.ShippingPrice).IsRequired();
        builder.Property(p => p.MoneyPaid).IsRequired();
        builder.Property(p => p.IsPaid).IsRequired();
        builder.Property(p => p.WasDelivered).IsRequired();
        builder.Property(p => p.RecipientName).HasMaxLength(255);
        builder.Property(p => p.RecipientCellphoneNumber).HasMaxLength(255);

        builder.Property(p => p.OrderPrice).HasPrecision(18, 2);
        builder.Property(p => p.RealizationPrice).HasPrecision(18, 2);
        builder.Property(p => p.ShippingPrice).HasPrecision(18, 2);
        builder.Property(p => p.MoneyPaid).HasPrecision(18, 2);

        builder.HasMany(p => p.Responsible).WithMany();
        builder.HasMany(p => p.Arrangement).WithMany();
        builder.HasMany(p => p.CommunicationType).WithMany();
        builder.HasMany(p => p.Branch).WithMany();
        builder.HasMany(p => p.DeliveryType).WithMany();
        builder.HasMany(p => p.Tags).WithMany();
    }
}
