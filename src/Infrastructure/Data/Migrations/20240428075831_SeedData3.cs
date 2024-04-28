using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Enflorarte.CRM.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedData3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "ReferenceImage" },
                values: new object[] { "Arrangement 1", "https://tableclothsfactory.com/cdn/shop/products/Royal-Blue-Artificial-Premium-Silk-Blossomed-Rose-Flowers.jpg?crop=center&height=900&v=1705969360&width=900" });

            migrationBuilder.UpdateData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "ReferenceImage" },
                values: new object[] { "Arrangement 2", "https://i.pinimg.com/736x/5c/3a/37/5c3a37c36edc7020110f14258cf20b02.jpg" });

            migrationBuilder.InsertData(
                table: "Arrangement",
                columns: new[] { "Id", "Extras", "IsAvailable", "IsTemplate", "Name", "ReferenceImage", "Tags" },
                values: new object[,]
                {
                    { 3, "[\"extra5\",\"extra6\"]", true, true, "Arrangement 3", "https://www.floristeriaserviflor.com/imagenes/ramos-de-flores/ramo-de-flores-variadas.jpg", "[\"tag5\",\"tag6\"]" },
                    { 4, "[\"extra7\",\"extra8\"]", true, false, "Arrangement 4", "https://th.bing.com/th/id/OIP.jhDoQH_cNgvyWYy9yH6eKQHaG8?rs=1&pid=ImgDetMain", "[\"tag7\",\"tag8\"]" }
                });

            migrationBuilder.UpdateData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Arrangement Type 1");

            migrationBuilder.UpdateData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Arrangement Type 2");

            migrationBuilder.InsertData(
                table: "ArrangementType",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 3, "Arrangement Type 3" },
                    { 4, "Arrangement Type 4" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "ReferenceImage" },
                values: new object[] { "Arreglo Primero", "https://ejemplo.com/imagen1.jpg" });

            migrationBuilder.UpdateData(
                table: "Arrangement",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "ReferenceImage" },
                values: new object[] { "Arreglo Segundo", "https://ejemplo.com/imagen2.jpg" });

            migrationBuilder.UpdateData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Tipo de Arreglo 1");

            migrationBuilder.UpdateData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Tipo de Arreglo 2");
        }
    }
}
