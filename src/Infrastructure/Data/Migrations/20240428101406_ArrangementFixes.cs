using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Enflorarte.CRM.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ArrangementFixes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 4);

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

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Arrangement");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Arrangement",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Arrangement",
                columns: new[] { "Id", "Extras", "IsAvailable", "IsTemplate", "Name", "ReferenceImage", "Tags" },
                values: new object[,]
                {
                    { 1, "[\"extra1\",\"extra2\"]", true, true, "Arrangement 1", "https://tableclothsfactory.com/cdn/shop/products/Royal-Blue-Artificial-Premium-Silk-Blossomed-Rose-Flowers.jpg?crop=center&height=900&v=1705969360&width=900", "[\"tag1\",\"tag2\"]" },
                    { 2, "[\"extra3\",\"extra4\"]", true, false, "Arrangement 2", "https://i.pinimg.com/736x/5c/3a/37/5c3a37c36edc7020110f14258cf20b02.jpg", "[\"tag3\",\"tag4\"]" },
                    { 3, "[\"extra5\",\"extra6\"]", true, true, "Arrangement 3", "https://www.floristeriaserviflor.com/imagenes/ramos-de-flores/ramo-de-flores-variadas.jpg", "[\"tag5\",\"tag6\"]" },
                    { 4, "[\"extra7\",\"extra8\"]", true, false, "Arrangement 4", "https://th.bing.com/th/id/OIP.jhDoQH_cNgvyWYy9yH6eKQHaG8?rs=1&pid=ImgDetMain", "[\"tag7\",\"tag8\"]" }
                });

            migrationBuilder.InsertData(
                table: "ArrangementType",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Arrangement Type 1" },
                    { 2, "Arrangement Type 2" },
                    { 3, "Arrangement Type 3" },
                    { 4, "Arrangement Type 4" }
                });

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
    }
}
