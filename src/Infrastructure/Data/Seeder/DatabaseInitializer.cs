﻿using Enflorarte.CRM.Domain.Constants;
using Enflorarte.CRM.Domain.Entities;
using Enflorarte.CRM.Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Enflorarte.CRM.Infrastructure.Data.Seeder;

public static class InitializerExtensions
{
    public static async Task InitializeDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var initialiser = scope.ServiceProvider.GetRequiredService<DatabaseInitializer>();
        await initialiser.InitialiseAsync();
        await initialiser.SeedAsync();
    }
}

public class DatabaseInitializer
{
    private readonly ApplicationDbContext _context;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;
    
    public DatabaseInitializer(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
    {
        this._context = context;
        _roleManager = roleManager;
        _userManager = userManager;
    }
    
    public async Task InitialiseAsync()
    {
        try
        {
            await _context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
            await SeedAdminUserAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    private async Task TrySeedAsync()
    {
        try {
            if (!await _context.Flower.AnyAsync())
            {
                List<Flower> flowers;
                if (!await _context.Flower.AnyAsync())
                {
                    flowers = new List<Flower>
                    {
                        new() {  Name = "Rose" },
                        new() {  Name = "Daisy" },
                        new() {  Name = "Tulip" },
                        new() {  Name = "Sunflower" }
                    };
                    _context.Flower.AddRange(flowers);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    flowers = await _context.Flower.ToListAsync();
                }

                if (!await _context.FlowerVariant.AnyAsync())
                {
                    int i = 0;
                    foreach (var flower in flowers)
                    {
                        _context.FlowerVariant.Add(
                            new FlowerVariant {  Name = "flowerVar" + i , FlowerId = flower.Id }
                        );
                        i++;
                    }
                    await _context.SaveChangesAsync();
                }

            }

            if (!await _context.DeliveryType.AnyAsync())
            {
                _context.DeliveryType.AddRange(
                    new DeliveryType {  Name = "Express" },
                    new DeliveryType {  Name = "Standard" },
                    new DeliveryType {  Name = "Economy" },
                    new DeliveryType {  Name = "Same Day" }
                );
            }

            if (!await _context.CommunicationType.AnyAsync())
            {
                List<CommunicationType> communicationTypes;
                if (!await _context.CommunicationType.AnyAsync())
                {
                    communicationTypes = new List<CommunicationType>
                    {
                        new() {  Name = "Email" },
                        new() {  Name = "Phone" },
                        new() {  Name = "SMS" },
                        new() {  Name = "WhatsApp" }
                    };
                    _context.CommunicationType.AddRange(communicationTypes);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    communicationTypes = await _context.CommunicationType.ToListAsync();
                }
                
                if (!await _context.Client.AnyAsync())
                {
                    _context.Client.AddRange(
                        new Client {  Name = "John Doe", Address = "123 Main St", PhoneNumber = "1234567890", CommunicationTypeId = communicationTypes[0].Id },
                        new Client {  Name = "Jane Doe", Address = "456 Elm St", PhoneNumber = "0987654321", CommunicationTypeId = communicationTypes[1].Id },
                        new Client {  Name = "Alice Smith", Address = "789 Oak St", PhoneNumber = "1357924680", CommunicationTypeId = communicationTypes[2].Id },
                        new Client {  Name = "Bob Smith", Address = "012 Pine St", PhoneNumber = "2468135790", CommunicationTypeId = communicationTypes[3].Id }
                    );
                }
            }

            if (!await _context.Wrapper.AnyAsync())
            {
                List<Wrapper> wrappers;
                
                if (!await _context.Wrapper.AnyAsync())
                {
                    wrappers = new List<Wrapper>
                    {
                        new() {  Name = "Paper" },
                        new() {  Name = "Plastic" },
                        new() {  Name = "Fabric" },
                        new() {  Name = "Metal" }
                    };
                    _context.Wrapper.AddRange(wrappers);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    wrappers = await _context.Wrapper.ToListAsync();
                }
                
                if (!await _context.WrapperVariant.AnyAsync())
                {
                    int i = 0;
                    foreach (var wrapper in wrappers)
                    {
                        _context.WrapperVariant.Add(
                            new WrapperVariant {  Name = "wrapperVar" + i, WrapperId = wrapper.Id }
                        );
                        i++;
                    }
                    await _context.SaveChangesAsync();
                }
            }

            if (!await _context.Responsible.AnyAsync())
            {
                _context.Responsible.AddRange(
                    new Responsible {  Name = "Jorge" },
                    new Responsible {  Name = "Maria" },
                    new Responsible {  Name = "Pedro" },
                    new Responsible {  Name = "Ana" }
                );
            }
                
            if (!await _context.Branch.AnyAsync())
            {
                _context.Branch.AddRange(
                    new Branch {  Name = "Mexicali" },
                    new Branch {  Name = "Ensenada" },
                    new Branch {  Name = "Tijuana" },
                    new Branch {  Name = "Rosarito" }
                );
            }
            
            if (!await _context.Arrangement.AnyAsync())
            {
                _context.Arrangement.AddRange(
                    new Arrangement
                    {
                        
                        Name = "Arrangement 1",
                        IsTemplate = true,
                        Extras = "extra1, extra2",
                        ReferenceImage = "https://tableclothsfactory.com/cdn/shop/products/Royal-Blue-Artificial-Premium-Silk-Blossomed-Rose-Flowers.jpg?crop=center&height=900&v=1705969360&width=900",
                        IsAvailable = true
                    },
                    new Arrangement
                    {
                        
                        Name = "Arrangement 2",
                        IsTemplate = false,
                        Extras = "extra3, extra4",
                        ReferenceImage = "https://i.pinimg.com/736x/5c/3a/37/5c3a37c36edc7020110f14258cf20b02.jpg",
                        IsAvailable = true
                    },
                    new Arrangement
                    {
                        
                        Name = "Arrangement 3",
                        IsTemplate = true,
                        Extras = "extra5, extra6",
                        ReferenceImage = "https://th.bing.com/th/id/OIP.woaplxBsaqPj7NiHnaFZPQHaJ4?rs=1&pid=ImgDetMain",
                        IsAvailable = true
                    },
                    new Arrangement
                    {
                        
                        Name = "Arrangement 4",
                        IsTemplate = false,
                        Extras = "extra7, extra8",
                        ReferenceImage = "https://th.bing.com/th/id/OIP.jhDoQH_cNgvyWYy9yH6eKQHaG8?rs=1&pid=ImgDetMain",
                        IsAvailable = true
                    }
                );
            }
            
            if (!await _context.ArrangementType.AnyAsync())
            {
                List<ArrangementType> arrangementTypes = new()
                {
                    new ArrangementType { Name = "Arrangement Type 1" },
                    new ArrangementType { Name = "Arrangement Type 2" },
                    new ArrangementType { Name = "Arrangement Type 3" },
                    new ArrangementType { Name = "Arrangement Type 4" }
                };
                _context.ArrangementType.AddRange(arrangementTypes);
            }

            await _context.SaveChangesAsync();
            await SeedManyToManyRelationshipsAsync();
        } catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    private async Task SeedManyToManyRelationshipsAsync()
    {
        var arrangements = await _context.Arrangement
            .Include(a => a.ArrangementTypes).Include(arrangement => arrangement.FlowerVariants)
            .Include(arrangement => arrangement.WrapperVariants)
            .ToListAsync();
        
        var arrangementTypes = await _context.ArrangementType.ToListAsync();
        var flowerVariants = await _context.FlowerVariant.ToListAsync();
        var wrapperVariants = await _context.WrapperVariant.ToListAsync();
        
        if (arrangements.Count == 0) return;
        foreach (var arrangement in arrangements)
        {
            if (arrangement.FlowerVariants.Count == 0 && flowerVariants.Count > 0)
            {
                foreach (var flower in flowerVariants)
                {
                    arrangement.FlowerVariants.Add(flower);
                }
            }
            
            if (arrangement.ArrangementTypes.Count == 0 && arrangementTypes.Count > 0)
            {
                foreach (var arrangementType in arrangementTypes)
                {
                    arrangement.ArrangementTypes.Add(arrangementType);
                }
            }

            if (arrangement.WrapperVariants.Count == 0 && wrapperVariants.Count > 0)
            {
                foreach (var wrapper in wrapperVariants)
                {
                    arrangement.WrapperVariants.Add(wrapper);
                }
            }
        }

        await _context.SaveChangesAsync();
    }

    private async Task SeedAdminUserAsync()
    {
        var administratorRole = new IdentityRole(Roles.Administrator);

        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }

        var administrator = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            await _userManager.CreateAsync(administrator, "Administrator1!");
            if (!string.IsNullOrWhiteSpace(administratorRole.Name))
            {
                await _userManager.AddToRolesAsync(administrator, new [] { administratorRole.Name });
            }
        }
    }
}
