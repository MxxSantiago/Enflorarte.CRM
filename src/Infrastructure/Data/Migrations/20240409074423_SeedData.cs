using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Enflorarte.CRM.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Branch",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Mexicali" },
                    { 2, "Ensenada" },
                    { 3, "Tijuana" },
                    { 4, "Rosarito" }
                });

            migrationBuilder.InsertData(
                table: "CommunicationType",
                columns: new[] { "Id", "Link", "Name" },
                values: new object[,]
                {
                    { 1, "", "Email" },
                    { 2, "", "Phone" },
                    { 3, "", "SMS" },
                    { 4, "", "WhatsApp" }
                });

            migrationBuilder.InsertData(
                table: "DeliveryType",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Express" },
                    { 2, "Standard" },
                    { 3, "Economy" },
                    { 4, "Same Day" }
                });

            migrationBuilder.InsertData(
                table: "Flower",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Rose" },
                    { 2, "Tulip" },
                    { 3, "Daisy" },
                    { 4, "Sunflower" }
                });

            migrationBuilder.InsertData(
                table: "Responsible",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Jorge" },
                    { 2, "Maria" },
                    { 3, "Pedro" },
                    { 4, "Ana" }
                });

            migrationBuilder.InsertData(
                table: "Wrapper",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Paper" },
                    { 2, "Plastic" },
                    { 3, "Fabric" },
                    { 4, "Metal" }
                });

            migrationBuilder.InsertData(
                table: "Client",
                columns: new[] { "Id", "Address", "CommunicationTypeId", "Name", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, "123 Main St", 1, "John Doe", "1234567890" },
                    { 2, "456 Elm St", 2, "Jane Doe", "0987654321" },
                    { 3, "789 Oak St", 3, "Alice Smith", "1357924680" },
                    { 4, "012 Pine St", 4, "Bob Smith", "2468135790" }
                });

            migrationBuilder.InsertData(
                table: "FlowerVariant",
                columns: new[] { "Id", "FlowerId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Red Rose" },
                    { 2, 2, "White Tulip" },
                    { 3, 3, "Yellow Daisy" },
                    { 4, 4, "Orange Sunflower" },
                    { 5, 1, "Pink Rose" },
                    { 6, 2, "Purple Tulip" },
                    { 7, 3, "Blue Daisy" },
                    { 8, 4, "Green Sunflower" },
                    { 9, 1, "Black Rose" },
                    { 10, 2, "White Tulip" },
                    { 11, 3, "Yellow Daisy" },
                    { 12, 4, "Orange Sunflower" },
                    { 13, 1, "Pink Rose" },
                    { 14, 2, "Purple Tulip" },
                    { 15, 3, "Blue Daisy" },
                    { 16, 4, "Green Sunflower" }
                });

            migrationBuilder.InsertData(
                table: "WrapperVariant",
                columns: new[] { "Id", "Name", "WrapperId" },
                values: new object[,]
                {
                    { 1, "Red", 1 },
                    { 2, "Blue", 2 },
                    { 3, "Green", 3 },
                    { 4, "Yellow", 4 },
                    { 5, "Purple", 1 },
                    { 6, "Orange", 2 },
                    { 7, "Black", 3 },
                    { 8, "White", 4 },
                    { 9, "Pink", 1 },
                    { 10, "Brown", 2 },
                    { 11, "Gray", 3 },
                    { 12, "Beige", 4 },
                    { 13, "Cyan", 1 },
                    { 14, "Magenta", 2 },
                    { 15, "Lime", 3 },
                    { 16, "Teal", 4 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Branch",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Branch",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Branch",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Branch",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Client",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Client",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Client",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Client",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "DeliveryType",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DeliveryType",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "DeliveryType",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "DeliveryType",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Responsible",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Responsible",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Responsible",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Responsible",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "CommunicationType",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CommunicationType",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CommunicationType",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CommunicationType",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Flower",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Flower",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Flower",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Flower",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Wrapper",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Wrapper",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Wrapper",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Wrapper",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
