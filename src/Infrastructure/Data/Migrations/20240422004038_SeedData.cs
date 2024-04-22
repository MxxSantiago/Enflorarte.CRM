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
            migrationBuilder.DropForeignKey(
                name: "FK_Client_CommunicationType_PreferredCommunicationTypeId",
                table: "Client");

            migrationBuilder.RenameColumn(
                name: "PreferredCommunicationTypeId",
                table: "Client",
                newName: "CommunicationTypeId");

            migrationBuilder.RenameColumn(
                name: "PreferredAddress",
                table: "Client",
                newName: "Address");

            migrationBuilder.RenameIndex(
                name: "IX_Client_PreferredCommunicationTypeId",
                table: "Client",
                newName: "IX_Client_CommunicationTypeId");

            migrationBuilder.AddColumn<int>(
                name: "ArrangementId",
                table: "WrapperVariant",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ArrangementId",
                table: "FlowerVariant",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Arrangement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsTemplate = table.Column<bool>(type: "bit", nullable: false),
                    Tags = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Extras = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ReferenceImage = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arrangement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArrangementType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ArrangementId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArrangementType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArrangementType_Arrangement_ArrangementId",
                        column: x => x.ArrangementId,
                        principalTable: "Arrangement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Arrangement",
                columns: new[] { "Id", "Extras", "IsAvailable", "IsTemplate", "Name", "ReferenceImage", "Tags" },
                values: new object[,]
                {
                    { 1, "[\"extra1\",\"extra2\"]", true, true, "Arreglo Primero", "https://ejemplo.com/imagen1.jpg", "[\"tag1\",\"tag2\"]" },
                    { 2, "[\"extra3\",\"extra4\"]", true, false, "Arreglo Segundo", "https://ejemplo.com/imagen2.jpg", "[\"tag3\",\"tag4\"]" }
                });

            migrationBuilder.InsertData(
                table: "ArrangementType",
                columns: new[] { "Id", "ArrangementId", "Name" },
                values: new object[,]
                {
                    { 1, null, "Tipo de Arreglo 1" },
                    { 2, null, "Tipo de Arreglo 2" }
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
                columns: new[] { "Id", "ArrangementId", "FlowerId", "Name" },
                values: new object[,]
                {
                    { 1, null, 1, "Red Rose" },
                    { 2, null, 2, "White Tulip" },
                    { 3, null, 3, "Yellow Daisy" },
                    { 4, null, 4, "Orange Sunflower" },
                    { 5, null, 1, "Pink Rose" },
                    { 6, null, 2, "Purple Tulip" },
                    { 7, null, 3, "Blue Daisy" },
                    { 8, null, 4, "Green Sunflower" },
                    { 9, null, 1, "Black Rose" },
                    { 10, null, 2, "White Tulip" },
                    { 11, null, 3, "Yellow Daisy" },
                    { 12, null, 4, "Orange Sunflower" },
                    { 13, null, 1, "Pink Rose" },
                    { 14, null, 2, "Purple Tulip" },
                    { 15, null, 3, "Blue Daisy" },
                    { 16, null, 4, "Green Sunflower" }
                });

            migrationBuilder.InsertData(
                table: "WrapperVariant",
                columns: new[] { "Id", "ArrangementId", "Name", "WrapperId" },
                values: new object[,]
                {
                    { 1, null, "Red", 1 },
                    { 2, null, "Blue", 2 },
                    { 3, null, "Green", 3 },
                    { 4, null, "Yellow", 4 },
                    { 5, null, "Purple", 1 },
                    { 6, null, "Orange", 2 },
                    { 7, null, "Black", 3 },
                    { 8, null, "White", 4 },
                    { 9, null, "Pink", 1 },
                    { 10, null, "Brown", 2 },
                    { 11, null, "Gray", 3 },
                    { 12, null, "Beige", 4 },
                    { 13, null, "Cyan", 1 },
                    { 14, null, "Magenta", 2 },
                    { 15, null, "Lime", 3 },
                    { 16, null, "Teal", 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WrapperVariant_ArrangementId",
                table: "WrapperVariant",
                column: "ArrangementId");

            migrationBuilder.CreateIndex(
                name: "IX_FlowerVariant_ArrangementId",
                table: "FlowerVariant",
                column: "ArrangementId");

            migrationBuilder.CreateIndex(
                name: "IX_ArrangementType_ArrangementId",
                table: "ArrangementType",
                column: "ArrangementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_CommunicationType_CommunicationTypeId",
                table: "Client",
                column: "CommunicationTypeId",
                principalTable: "CommunicationType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FlowerVariant_Arrangement_ArrangementId",
                table: "FlowerVariant",
                column: "ArrangementId",
                principalTable: "Arrangement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WrapperVariant_Arrangement_ArrangementId",
                table: "WrapperVariant",
                column: "ArrangementId",
                principalTable: "Arrangement",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_CommunicationType_CommunicationTypeId",
                table: "Client");

            migrationBuilder.DropForeignKey(
                name: "FK_FlowerVariant_Arrangement_ArrangementId",
                table: "FlowerVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_WrapperVariant_Arrangement_ArrangementId",
                table: "WrapperVariant");

            migrationBuilder.DropTable(
                name: "ArrangementType");

            migrationBuilder.DropTable(
                name: "Arrangement");

            migrationBuilder.DropIndex(
                name: "IX_WrapperVariant_ArrangementId",
                table: "WrapperVariant");

            migrationBuilder.DropIndex(
                name: "IX_FlowerVariant_ArrangementId",
                table: "FlowerVariant");

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
                name: "ArrangementId",
                table: "WrapperVariant");

            migrationBuilder.DropColumn(
                name: "ArrangementId",
                table: "FlowerVariant");

            migrationBuilder.RenameColumn(
                name: "CommunicationTypeId",
                table: "Client",
                newName: "PreferredCommunicationTypeId");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Client",
                newName: "PreferredAddress");

            migrationBuilder.RenameIndex(
                name: "IX_Client_CommunicationTypeId",
                table: "Client",
                newName: "IX_Client_PreferredCommunicationTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_CommunicationType_PreferredCommunicationTypeId",
                table: "Client",
                column: "PreferredCommunicationTypeId",
                principalTable: "CommunicationType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
