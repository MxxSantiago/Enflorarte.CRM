using Enflorarte.CRM.Domain.Constants;
using Enflorarte.CRM.Domain.Entities;
using Enflorarte.CRM.Domain.Enums;
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
            await SeedOperatorUserAsync();
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
                        new() { Name = "Lirio" },
new() { Name = "Orquídea" },
new() { Name = "Hortensia" },
new() { Name = "Clavel" },
new() { Name = "Iris" },
new() { Name = "Dalia" },
new() { Name = "Peonía" },
new() { Name = "Fresia" },
new() { Name = "Jacinto" },
new() { Name = "Amapola" }

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
            new FlowerVariant { Name = "Variante de " + flower.Name, FlowerId = flower.Id }
                        );
                        i++;
                    }
                    await _context.SaveChangesAsync();
                }

            }

            if (!await _context.DeliveryType.AnyAsync())
            {
                _context.DeliveryType.AddRange(
                    new DeliveryType { Name = "Entrega al Día Siguiente" },
new DeliveryType { Name = "Internacional" },
new DeliveryType { Name = "Recoger en Sucursal" },
new DeliveryType { Name = "Programada" },
new DeliveryType { Name = "Domicilio" }
                );
            }

            if (!await _context.CommunicationType.AnyAsync())
            {
                List<CommunicationType> communicationTypes;
                if (!await _context.CommunicationType.AnyAsync())
                {
                    communicationTypes = new List<CommunicationType>
                    {
                        new() { Name = "Correo Electrónico" },
   new() { Name = "Teléfono" },
   new() { Name = "SMS" },
   new() { Name = "WhatsApp" },
   new() { Name = "Telegram" },
   new() { Name = "Señal" },
   new() { Name = "Mensajería Instantánea" },
   new() { Name = "Fax" },
   new() { Name = "Carta" },
   new() { Name = "Videollamada"} 
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
                        new Client
   {
       Name = "Juan Pérez",
       Address = "Calle Principal 123",
       PhoneNumber = "5512345678",
       CommunicationTypeId = communicationTypes[0].Id // Correo Electrónico
   },
   new Client
   {
       Name = "María García",
       Address = "Avenida Elm 456",
       PhoneNumber = "5587654321",
       CommunicationTypeId = communicationTypes[1].Id // Teléfono
   },
   new Client
   {
       Name = "Alicia Rodríguez",
       Address = "Calle Roble 789",
       PhoneNumber = "5513579246",
       CommunicationTypeId = communicationTypes[2].Id // SMS
   },
   new Client
   {
       Name = "Roberto Hernández",
       Address = "Calle Pino 012",
       PhoneNumber = "5524681357",
       CommunicationTypeId = communicationTypes[3].Id // WhatsApp
   },
   new Client
   {
       Name = "Ana López",
       Address = "Avenida Maple 567",
       PhoneNumber = "5598765432",
       CommunicationTypeId = communicationTypes[4].Id // Telegram
   },
   new Client
   {
       Name = "Javier Ramírez",
       Address = "Calle Cedro 890",
       PhoneNumber = "5513476285",
       CommunicationTypeId = communicationTypes[5].Id // Señal
   },
   new Client
   {
       Name = "Sofía Torres",
       Address = "Calle Palma 147",
       PhoneNumber = "5525839614",
       CommunicationTypeId = communicationTypes[6].Id // Mensajería Instantánea
   },
   new Client
   {
       Name = "Carlos Fernández",
       Address = "Avenida Ciprés 258",
       PhoneNumber = "5536974125",
       CommunicationTypeId = communicationTypes[7].Id // Fax
   },
   new Client
   {
       Name = "Laura Gómez",
       Address = "Calle Nogal 369",
       PhoneNumber = "5514728596",
       CommunicationTypeId = communicationTypes[8].Id // Carta
   },
   new Client
   {
       Name = "Pedro Sánchez",
       Address = "Avenida Olmo 741",
       PhoneNumber = "5528963175",
       CommunicationTypeId = communicationTypes[9].Id // Videollamada
   }
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
                            new() { Name = "Papel" },
    new() { Name = "Plástico" },
    new() { Name = "Tela" },
    new() { Name = "Metálico" },
    new() { Name = "Burbuja" },
    new() { Name = "Celofán" },
    new() { Name = "Papel de Seda" },
    new() { Name = "Papel Kraft" },
    new() { Name = "Vinilo" },
    new() { Name = "Aluminio" }
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
                            new WrapperVariant { Name = "Variante de " + wrapper.Name, WrapperId = wrapper.Id }
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
            
            if (!await _context.Tag.AnyAsync())
            {
                _context.Tag.AddRange(
                   new Tag { Name = "Importante", Color = "#ffa500" },
   new Tag { Name = "Urgente", Color = "#800080" },
   new Tag { Name = "Promoción", Color = "#008000" },
   new Tag { Name = "Nuevo", Color = "#ff0000" },
   new Tag { Name = "Descuento", Color = "#00ff00" },
   new Tag { Name = "Oferta", Color = "#0000ff" },
   new Tag { Name = "San Valentín", Color = "#ff69b4" },
   new Tag { Name = "Navidad", Color = "#008000" },
   new Tag { Name = "Año Nuevo", Color = "#ffd700" },
   new Tag { Name = "Pascua", Color = "#ffa07a" },
   new Tag { Name = "Halloween", Color = "#ffa500" }
                );
            }
            
            if (!await _context.Arrangement.AnyAsync())
            {
                _context.Arrangement.AddRange(
                   new Arrangement
{
    Name = "Decoración Elegante",
    IsTemplate = true,
    Extras = "Envoltura de papel, lazo decorativo",
    ReferenceImage = "https://tableclothsfactory.com/cdn/shop/products/Royal-Blue-Artificial-Premium-Silk-Blossomed-Rose-Flowers.jpg?crop=center&height=900&v=1705969360&width=900",
    IsAvailable = true
},
new Arrangement
{
    Name = "Caja de Sorpresas",
    IsTemplate = false,
    Extras = "Caja de regalo, tarjeta personalizada",
    ReferenceImage = "https://i.pinimg.com/736x/5c/3a/37/5c3a37c36edc7020110f14258cf20b02.jpg",
    IsAvailable = true
},
new Arrangement
{
    Name = "Arte Floral",
    IsTemplate = true,
    Extras = "Envoltura de celofán, tarjeta de felicitación",
    ReferenceImage = "https://th.bing.com/th/id/OIP.woaplxBsaqPj7NiHnaFZPQHaJ4?rs=1&pid=ImgDetMain",
    IsAvailable = true
},
new Arrangement
{
    Name = "Elegancia Natural",
    IsTemplate = false,
    Extras = "Caja de madera, cinta de rafia",
    ReferenceImage = "https://th.bing.com/th/id/OIP.jhDoQH_cNgvyWYy9yH6eKQHaG8?rs=1&pid=ImgDetMain",
    IsAvailable = true
}

                );
            }
            
            if (!await _context.ArrangementType.AnyAsync())
            {
                List<ArrangementType> arrangementTypes = new()
                {
                    new ArrangementType { Name = "Ramo de Flores" },
   new ArrangementType { Name = "Arreglo en Canasta" },
   new ArrangementType { Name = "Arreglo en Maceta" },
   new ArrangementType { Name = "Arreglo en Caja" },
   new ArrangementType { Name = "Bouquet de Novia" },
   new ArrangementType { Name = "Arreglo Fúnebre" },
   new ArrangementType { Name = "Arreglo de Cumpleaños" },
   new ArrangementType { Name = "Arreglo de Aniversario" },
   new ArrangementType { Name = "Arreglo de Bienvenida" },
   new ArrangementType { Name = "Arreglo de Agradecimiento" }
                };
                _context.ArrangementType.AddRange(arrangementTypes);
            }

            if (!await _context.Order.AnyAsync())
            {
                List<Order> orders = new()
                {
                    new Order
{
    DeliveryDate = DateTime.Now.AddDays(7),
    OrderDate = DateTime.Now,
    PaymentStatus = PaymentStatus.Pending,
    OrderStatus = OrderStatus.Pending,
    Address = "123 Calle Principal",
    Description = "Flores de temporada para decoración de la sala de estar.",
    OrderPrice = 100.0m,
    RecipientName = "Juan Pérez",
    RecipientCellphoneNumber = "1234567890",
    ReferenceImage = "https://picsum.photos/1000?random",
},
new Order
{
    DeliveryDate = DateTime.Now.AddDays(7),
    OrderDate = DateTime.Now,
    PaymentStatus = PaymentStatus.Pending,
    OrderStatus = OrderStatus.Pending,
    Address = "456 Calle Olmo",
    Description = "Arreglo floral para cumpleaños de un ser querido.",
    OrderPrice = 200.0m,
    RecipientName = "Juana Pérez",
    RecipientCellphoneNumber = "0987654321",
    ReferenceImage = "https://picsum.photos/1000?random",
},
new Order
{
    DeliveryDate = DateTime.Now.AddDays(7),
    OrderDate = DateTime.Now,
    PaymentStatus = PaymentStatus.Pending,
    OrderStatus = OrderStatus.Pending,
    Address = "789 Calle Roble",
    Description = "Ramo de flores para una boda en el jardín.",
    OrderPrice = 300.0m,
    RecipientName = "Ana Gómez",
    RecipientCellphoneNumber = "1357924680",
    ReferenceImage = "https://picsum.photos/1000?random",
},
new Order
{
    DeliveryDate = DateTime.Now.AddDays(7),
    OrderDate = DateTime.Now,
    PaymentStatus = PaymentStatus.Pending,
    OrderStatus = OrderStatus.Pending,
    Address = "012 Calle Pino",
    Description = "Arreglo floral para decorar la mesa del comedor.",
    OrderPrice = 400.0m,
    RecipientName = "Roberto Gómez",
    RecipientCellphoneNumber = "2468135790",
    ReferenceImage = "https://picsum.photos/1000?random"
}

                };
                _context.Order.AddRange(orders);
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
        
        // Seed orders with all the many to many relationships
        var orders = await _context.Order
            .Include(order => order.Arrangement)
            .Include(order => order.Responsible)
            .Include(order => order.CommunicationType)
            .Include(order => order.Branch)
            .Include(order => order.DeliveryType)
            .Include(order => order.Tags)
            .ToListAsync();
        
        var responsibles = await _context.Responsible.ToListAsync();
        var communicationTypes = await _context.CommunicationType.ToListAsync();
        var branches = await _context.Branch.ToListAsync();
        var deliveryTypes = await _context.DeliveryType.ToListAsync();
        var tags = await _context.Tag.ToListAsync();
        
        if (orders.Count == 0) return;
        foreach (var order in orders)
        {
            if (order.Arrangement.Count == 0 && arrangements.Count > 0)
            {
                foreach (var arrangement in arrangements)
                {
                    order.Arrangement.Add(arrangement);
                }
            }
            
            if (order.Responsible.Count == 0 && responsibles.Count > 0)
            {
                foreach (var responsible in responsibles)
                {
                    order.Responsible.Add(responsible);
                }
            }
            
            if (order.CommunicationType.Count == 0 && communicationTypes.Count > 0)
            {
                foreach (var communicationType in communicationTypes)
                {
                    order.CommunicationType.Add(communicationType);
                }
            }
            
            if (order.Branch.Count == 0 && branches.Count > 0)
            {
                foreach (var branch in branches)
                {
                    order.Branch.Add(branch);
                }
            }
            
            if (order.DeliveryType.Count == 0 && deliveryTypes.Count > 0)
            {
                foreach (var deliveryType in deliveryTypes)
                {
                    order.DeliveryType.Add(deliveryType);
                }
            }
            
            if (order.Tags.Count == 0 && tags.Count > 0)
            {
                foreach (var tag in tags)
                {
                    order.Tags.Add(tag);
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
    
    private async Task SeedOperatorUserAsync()
    {
        var operatorRole = new IdentityRole(Roles.Operator);

        if (_roleManager.Roles.All(r => r.Name != operatorRole.Name))
        {
            await _roleManager.CreateAsync(operatorRole);
        }

        var operatorUser = new ApplicationUser { UserName = "operator@localhost", Email = "operator@localhost" };

        if (_userManager.Users.All(u => u.UserName != operatorUser.UserName))
        {
            await _userManager.CreateAsync(operatorUser, "Operator1!");
            if (!string.IsNullOrWhiteSpace(operatorRole.Name))
            {
                await _userManager.AddToRolesAsync(operatorUser, new [] { operatorRole.Name });
            }
        }
    }
}
