﻿// <auto-generated />
using System;
using Enflorarte.CRM.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Enflorarte.CRM.Infrastructure.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ArrangementArrangementType", b =>
                {
                    b.Property<int>("ArrangementId")
                        .HasColumnType("int");

                    b.Property<int>("ArrangementTypesId")
                        .HasColumnType("int");

                    b.HasKey("ArrangementId", "ArrangementTypesId");

                    b.HasIndex("ArrangementTypesId");

                    b.ToTable("ArrangementArrangementType");
                });

            modelBuilder.Entity("ArrangementFlowerVariant", b =>
                {
                    b.Property<int>("ArrangementId")
                        .HasColumnType("int");

                    b.Property<int>("FlowerVariantsId")
                        .HasColumnType("int");

                    b.HasKey("ArrangementId", "FlowerVariantsId");

                    b.HasIndex("FlowerVariantsId");

                    b.ToTable("ArrangementFlowerVariant");
                });

            modelBuilder.Entity("ArrangementWrapperVariant", b =>
                {
                    b.Property<int>("ArrangementId")
                        .HasColumnType("int");

                    b.Property<int>("WrapperVariantsId")
                        .HasColumnType("int");

                    b.HasKey("ArrangementId", "WrapperVariantsId");

                    b.HasIndex("WrapperVariantsId");

                    b.ToTable("ArrangementWrapperVariant");
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.Arrangement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Extras")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("bit");

                    b.Property<bool>("IsTemplate")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ReferenceImage")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Tags")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Arrangement");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Extras = "[\"extra1\",\"extra2\"]",
                            IsAvailable = true,
                            IsTemplate = true,
                            Name = "Arreglo Primero",
                            ReferenceImage = "https://ejemplo.com/imagen1.jpg",
                            Tags = "[\"tag1\",\"tag2\"]"
                        },
                        new
                        {
                            Id = 2,
                            Extras = "[\"extra3\",\"extra4\"]",
                            IsAvailable = true,
                            IsTemplate = false,
                            Name = "Arreglo Segundo",
                            ReferenceImage = "https://ejemplo.com/imagen2.jpg",
                            Tags = "[\"tag3\",\"tag4\"]"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.ArrangementType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("ArrangementType");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Tipo de Arreglo 1"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Tipo de Arreglo 2"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.Branch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Branch");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Mexicali"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Ensenada"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Tijuana"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Rosarito"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("CommunicationTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("Id");

                    b.HasIndex("CommunicationTypeId");

                    b.ToTable("Client");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "123 Main St",
                            CommunicationTypeId = 1,
                            Name = "John Doe",
                            PhoneNumber = "1234567890"
                        },
                        new
                        {
                            Id = 2,
                            Address = "456 Elm St",
                            CommunicationTypeId = 2,
                            Name = "Jane Doe",
                            PhoneNumber = "0987654321"
                        },
                        new
                        {
                            Id = 3,
                            Address = "789 Oak St",
                            CommunicationTypeId = 3,
                            Name = "Alice Smith",
                            PhoneNumber = "1357924680"
                        },
                        new
                        {
                            Id = 4,
                            Address = "012 Pine St",
                            CommunicationTypeId = 4,
                            Name = "Bob Smith",
                            PhoneNumber = "2468135790"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.CommunicationType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("CommunicationType");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Link = "",
                            Name = "Email"
                        },
                        new
                        {
                            Id = 2,
                            Link = "",
                            Name = "Phone"
                        },
                        new
                        {
                            Id = 3,
                            Link = "",
                            Name = "SMS"
                        },
                        new
                        {
                            Id = 4,
                            Link = "",
                            Name = "WhatsApp"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.DeliveryType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("DeliveryType");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Express"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Standard"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Economy"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Same Day"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.Flower", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Flower");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Rose"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Tulip"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Daisy"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Sunflower"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.FlowerVariant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FlowerId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("FlowerId");

                    b.ToTable("FlowerVariant");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FlowerId = 1,
                            Name = "Red Rose"
                        },
                        new
                        {
                            Id = 2,
                            FlowerId = 2,
                            Name = "White Tulip"
                        },
                        new
                        {
                            Id = 3,
                            FlowerId = 3,
                            Name = "Yellow Daisy"
                        },
                        new
                        {
                            Id = 4,
                            FlowerId = 4,
                            Name = "Orange Sunflower"
                        },
                        new
                        {
                            Id = 5,
                            FlowerId = 1,
                            Name = "Pink Rose"
                        },
                        new
                        {
                            Id = 6,
                            FlowerId = 2,
                            Name = "Purple Tulip"
                        },
                        new
                        {
                            Id = 7,
                            FlowerId = 3,
                            Name = "Blue Daisy"
                        },
                        new
                        {
                            Id = 8,
                            FlowerId = 4,
                            Name = "Green Sunflower"
                        },
                        new
                        {
                            Id = 9,
                            FlowerId = 1,
                            Name = "Black Rose"
                        },
                        new
                        {
                            Id = 10,
                            FlowerId = 2,
                            Name = "White Tulip"
                        },
                        new
                        {
                            Id = 11,
                            FlowerId = 3,
                            Name = "Yellow Daisy"
                        },
                        new
                        {
                            Id = 12,
                            FlowerId = 4,
                            Name = "Orange Sunflower"
                        },
                        new
                        {
                            Id = 13,
                            FlowerId = 1,
                            Name = "Pink Rose"
                        },
                        new
                        {
                            Id = 14,
                            FlowerId = 2,
                            Name = "Purple Tulip"
                        },
                        new
                        {
                            Id = 15,
                            FlowerId = 3,
                            Name = "Blue Daisy"
                        },
                        new
                        {
                            Id = 16,
                            FlowerId = 4,
                            Name = "Green Sunflower"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.Responsible", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Responsible");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Jorge"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Maria"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Pedro"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Ana"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.Wrapper", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Wrapper");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Paper"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Plastic"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Fabric"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Metal"
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.WrapperVariant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("WrapperId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WrapperId");

                    b.ToTable("WrapperVariant");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Red",
                            WrapperId = 1
                        },
                        new
                        {
                            Id = 2,
                            Name = "Blue",
                            WrapperId = 2
                        },
                        new
                        {
                            Id = 3,
                            Name = "Green",
                            WrapperId = 3
                        },
                        new
                        {
                            Id = 4,
                            Name = "Yellow",
                            WrapperId = 4
                        },
                        new
                        {
                            Id = 5,
                            Name = "Purple",
                            WrapperId = 1
                        },
                        new
                        {
                            Id = 6,
                            Name = "Orange",
                            WrapperId = 2
                        },
                        new
                        {
                            Id = 7,
                            Name = "Black",
                            WrapperId = 3
                        },
                        new
                        {
                            Id = 8,
                            Name = "White",
                            WrapperId = 4
                        },
                        new
                        {
                            Id = 9,
                            Name = "Pink",
                            WrapperId = 1
                        },
                        new
                        {
                            Id = 10,
                            Name = "Brown",
                            WrapperId = 2
                        },
                        new
                        {
                            Id = 11,
                            Name = "Gray",
                            WrapperId = 3
                        },
                        new
                        {
                            Id = 12,
                            Name = "Beige",
                            WrapperId = 4
                        },
                        new
                        {
                            Id = 13,
                            Name = "Cyan",
                            WrapperId = 1
                        },
                        new
                        {
                            Id = 14,
                            Name = "Magenta",
                            WrapperId = 2
                        },
                        new
                        {
                            Id = 15,
                            Name = "Lime",
                            WrapperId = 3
                        },
                        new
                        {
                            Id = 16,
                            Name = "Teal",
                            WrapperId = 4
                        });
                });

            modelBuilder.Entity("Enflorarte.CRM.Infrastructure.Identity.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("ArrangementArrangementType", b =>
                {
                    b.HasOne("Enflorarte.CRM.Domain.Entities.Arrangement", null)
                        .WithMany()
                        .HasForeignKey("ArrangementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Enflorarte.CRM.Domain.Entities.ArrangementType", null)
                        .WithMany()
                        .HasForeignKey("ArrangementTypesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ArrangementFlowerVariant", b =>
                {
                    b.HasOne("Enflorarte.CRM.Domain.Entities.Arrangement", null)
                        .WithMany()
                        .HasForeignKey("ArrangementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Enflorarte.CRM.Domain.Entities.FlowerVariant", null)
                        .WithMany()
                        .HasForeignKey("FlowerVariantsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ArrangementWrapperVariant", b =>
                {
                    b.HasOne("Enflorarte.CRM.Domain.Entities.Arrangement", null)
                        .WithMany()
                        .HasForeignKey("ArrangementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Enflorarte.CRM.Domain.Entities.WrapperVariant", null)
                        .WithMany()
                        .HasForeignKey("WrapperVariantsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.Client", b =>
                {
                    b.HasOne("Enflorarte.CRM.Domain.Entities.CommunicationType", "CommunicationType")
                        .WithMany()
                        .HasForeignKey("CommunicationTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("CommunicationType");
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.FlowerVariant", b =>
                {
                    b.HasOne("Enflorarte.CRM.Domain.Entities.Flower", "Flower")
                        .WithMany()
                        .HasForeignKey("FlowerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Flower");
                });

            modelBuilder.Entity("Enflorarte.CRM.Domain.Entities.WrapperVariant", b =>
                {
                    b.HasOne("Enflorarte.CRM.Domain.Entities.Wrapper", "Wrapper")
                        .WithMany()
                        .HasForeignKey("WrapperId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Wrapper");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Enflorarte.CRM.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Enflorarte.CRM.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Enflorarte.CRM.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Enflorarte.CRM.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
