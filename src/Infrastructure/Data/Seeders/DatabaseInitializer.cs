using Enflorarte.CRM.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class DataSeeder
{
    public static void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Flower>().HasData(new Flower[] { });
        modelBuilder.Entity<FlowerVariant>().HasData(new FlowerVariant[] { });
        modelBuilder.Entity<DeliveryType>().HasData(new DeliveryType[] { });
        modelBuilder.Entity<CommunicationType>().HasData(new CommunicationType[] { });
        modelBuilder.Entity<Client>().HasData(new Client[] { });
        modelBuilder.Entity<Wrapper>().HasData(new Wrapper[] { });
        modelBuilder.Entity<WrapperVariant>().HasData(new WrapperVariant[] { });
        modelBuilder.Entity<Responsible>().HasData(new Responsible[] { });
        modelBuilder.Entity<Branch>().HasData(new Branch[] { });
        
        modelBuilder.Entity<Flower>().HasData(
            new Flower { Id = 1, Name = "Rose" },
            new Flower { Id = 2, Name = "Tulip" },
            new Flower { Id = 3, Name = "Daisy" },
            new Flower { Id = 4, Name = "Sunflower" }
        );
        
        modelBuilder.Entity<FlowerVariant>().HasData(
            new FlowerVariant { Id = 1, Name = "Red Rose", FlowerId = 1 },
            new FlowerVariant { Id = 2, Name = "White Tulip", FlowerId = 2 },
            new FlowerVariant { Id = 3, Name = "Yellow Daisy", FlowerId = 3 },
            new FlowerVariant { Id = 4, Name = "Orange Sunflower", FlowerId = 4 },
            new FlowerVariant { Id = 5, Name = "Pink Rose", FlowerId = 1 },
            new FlowerVariant { Id = 6, Name = "Purple Tulip", FlowerId = 2 },
            new FlowerVariant { Id = 7, Name = "Blue Daisy", FlowerId = 3 },
            new FlowerVariant { Id = 8, Name = "Green Sunflower", FlowerId = 4 },
            new FlowerVariant { Id = 9, Name = "Black Rose", FlowerId = 1 },
            new FlowerVariant { Id = 10, Name = "White Tulip", FlowerId = 2 },
            new FlowerVariant { Id = 11, Name = "Yellow Daisy", FlowerId = 3 },
            new FlowerVariant { Id = 12, Name = "Orange Sunflower", FlowerId = 4 },
            new FlowerVariant { Id = 13, Name = "Pink Rose", FlowerId = 1 },
            new FlowerVariant { Id = 14, Name = "Purple Tulip", FlowerId = 2 },
            new FlowerVariant { Id = 15, Name = "Blue Daisy", FlowerId = 3 },
            new FlowerVariant { Id = 16, Name = "Green Sunflower", FlowerId = 4 }
        );

        modelBuilder.Entity<DeliveryType>().HasData(
            new DeliveryType { Id = 1, Name = "Express" },
            new DeliveryType { Id = 2, Name = "Standard" },
            new DeliveryType { Id = 3, Name = "Economy" },
            new DeliveryType { Id = 4, Name = "Same Day" }
        );
        
        modelBuilder.Entity<CommunicationType>().HasData(
            new CommunicationType { Id = 1, Name = "Email" },
            new CommunicationType { Id = 2, Name = "Phone" },
            new CommunicationType { Id = 3, Name = "SMS" },
            new CommunicationType { Id = 4, Name = "WhatsApp" }
        );

        modelBuilder.Entity<Client>().HasData(
            new Client { Id = 1, Name = "John Doe", Address = "123 Main St", PhoneNumber = "1234567890", CommunicationTypeId = 1 },
            new Client { Id = 2, Name = "Jane Doe", Address = "456 Elm St", PhoneNumber = "0987654321", CommunicationTypeId = 2 },
            new Client { Id = 3, Name = "Alice Smith", Address = "789 Oak St", PhoneNumber = "1357924680", CommunicationTypeId = 3 },
            new Client { Id = 4, Name = "Bob Smith", Address = "012 Pine St", PhoneNumber = "2468135790", CommunicationTypeId = 4 }
        );

        modelBuilder.Entity<Wrapper>().HasData(
            new Wrapper { Id = 1, Name = "Paper" },
            new Wrapper { Id = 2, Name = "Plastic" },
            new Wrapper { Id = 3, Name = "Fabric" },
            new Wrapper { Id = 4, Name = "Metal" }
        );

        modelBuilder.Entity<WrapperVariant>().HasData(
            new WrapperVariant { Id = 1, Name = "Red", WrapperId = 1 },
            new WrapperVariant { Id = 2, Name = "Blue", WrapperId = 2 },
            new WrapperVariant { Id = 3, Name = "Green", WrapperId = 3 },
            new WrapperVariant { Id = 4, Name = "Yellow", WrapperId = 4 },
            new WrapperVariant { Id = 5, Name = "Purple", WrapperId = 1 },
            new WrapperVariant { Id = 6, Name = "Orange", WrapperId = 2 },
            new WrapperVariant { Id = 7, Name = "Black", WrapperId = 3 },
            new WrapperVariant { Id = 8, Name = "White", WrapperId = 4 },
            new WrapperVariant { Id = 9, Name = "Pink", WrapperId = 1 },
            new WrapperVariant { Id = 10, Name = "Brown", WrapperId = 2 },
            new WrapperVariant { Id = 11, Name = "Gray", WrapperId = 3 },
            new WrapperVariant { Id = 12, Name = "Beige", WrapperId = 4 },
            new WrapperVariant { Id = 13, Name = "Cyan", WrapperId = 1 },
            new WrapperVariant { Id = 14, Name = "Magenta", WrapperId = 2 },
            new WrapperVariant { Id = 15, Name = "Lime", WrapperId = 3 },
            new WrapperVariant { Id = 16, Name = "Teal", WrapperId = 4 }
        );

        modelBuilder.Entity<Responsible>().HasData(
            new Responsible { Id = 1, Name = "Jorge" },
            new Responsible { Id = 2, Name = "Maria" },
            new Responsible { Id = 3, Name = "Pedro" },
            new Responsible { Id = 4, Name = "Ana" }
        );

        modelBuilder.Entity<Branch>().HasData(
            new Branch { Id = 1, Name = "Mexicali" },
            new Branch { Id = 2, Name = "Ensenada" },
            new Branch { Id = 3, Name = "Tijuana" },
            new Branch { Id = 4, Name = "Rosarito" }
        );
    }
}
