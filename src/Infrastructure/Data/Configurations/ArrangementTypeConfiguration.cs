﻿using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Enflorarte.CRM.Infrastructure.Data.Configurations;

public class ArrangementTypeConfiguration : IEntityTypeConfiguration<ArrangementType>
{
    public void Configure(EntityTypeBuilder<ArrangementType> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Name).HasMaxLength(100).IsRequired();
    }
}
