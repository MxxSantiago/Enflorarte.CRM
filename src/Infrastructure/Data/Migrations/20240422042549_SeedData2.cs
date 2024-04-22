using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Enflorarte.CRM.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedData2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArrangementType_Arrangement_ArrangementId",
                table: "ArrangementType");

            migrationBuilder.DropForeignKey(
                name: "FK_FlowerVariant_Arrangement_ArrangementId",
                table: "FlowerVariant");

            migrationBuilder.DropForeignKey(
                name: "FK_WrapperVariant_Arrangement_ArrangementId",
                table: "WrapperVariant");

            migrationBuilder.DropIndex(
                name: "IX_WrapperVariant_ArrangementId",
                table: "WrapperVariant");

            migrationBuilder.DropIndex(
                name: "IX_FlowerVariant_ArrangementId",
                table: "FlowerVariant");

            migrationBuilder.DropIndex(
                name: "IX_ArrangementType_ArrangementId",
                table: "ArrangementType");

            migrationBuilder.DropColumn(
                name: "ArrangementId",
                table: "WrapperVariant");

            migrationBuilder.DropColumn(
                name: "ArrangementId",
                table: "FlowerVariant");

            migrationBuilder.DropColumn(
                name: "ArrangementId",
                table: "ArrangementType");

            migrationBuilder.CreateTable(
                name: "ArrangementArrangementType",
                columns: table => new
                {
                    ArrangementId = table.Column<int>(type: "int", nullable: false),
                    ArrangementTypesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArrangementArrangementType", x => new { x.ArrangementId, x.ArrangementTypesId });
                    table.ForeignKey(
                        name: "FK_ArrangementArrangementType_ArrangementType_ArrangementTypesId",
                        column: x => x.ArrangementTypesId,
                        principalTable: "ArrangementType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArrangementArrangementType_Arrangement_ArrangementId",
                        column: x => x.ArrangementId,
                        principalTable: "Arrangement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArrangementFlowerVariant",
                columns: table => new
                {
                    ArrangementId = table.Column<int>(type: "int", nullable: false),
                    FlowerVariantsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArrangementFlowerVariant", x => new { x.ArrangementId, x.FlowerVariantsId });
                    table.ForeignKey(
                        name: "FK_ArrangementFlowerVariant_Arrangement_ArrangementId",
                        column: x => x.ArrangementId,
                        principalTable: "Arrangement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArrangementFlowerVariant_FlowerVariant_FlowerVariantsId",
                        column: x => x.FlowerVariantsId,
                        principalTable: "FlowerVariant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArrangementWrapperVariant",
                columns: table => new
                {
                    ArrangementId = table.Column<int>(type: "int", nullable: false),
                    WrapperVariantsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArrangementWrapperVariant", x => new { x.ArrangementId, x.WrapperVariantsId });
                    table.ForeignKey(
                        name: "FK_ArrangementWrapperVariant_Arrangement_ArrangementId",
                        column: x => x.ArrangementId,
                        principalTable: "Arrangement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArrangementWrapperVariant_WrapperVariant_WrapperVariantsId",
                        column: x => x.WrapperVariantsId,
                        principalTable: "WrapperVariant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArrangementArrangementType_ArrangementTypesId",
                table: "ArrangementArrangementType",
                column: "ArrangementTypesId");

            migrationBuilder.CreateIndex(
                name: "IX_ArrangementFlowerVariant_FlowerVariantsId",
                table: "ArrangementFlowerVariant",
                column: "FlowerVariantsId");

            migrationBuilder.CreateIndex(
                name: "IX_ArrangementWrapperVariant_WrapperVariantsId",
                table: "ArrangementWrapperVariant",
                column: "WrapperVariantsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArrangementArrangementType");

            migrationBuilder.DropTable(
                name: "ArrangementFlowerVariant");

            migrationBuilder.DropTable(
                name: "ArrangementWrapperVariant");

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

            migrationBuilder.AddColumn<int>(
                name: "ArrangementId",
                table: "ArrangementType",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 1,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "ArrangementType",
                keyColumn: "Id",
                keyValue: 2,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 1,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 2,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 3,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 4,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 5,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 6,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 7,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 8,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 9,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 10,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 11,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 12,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 13,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 14,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 15,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "FlowerVariant",
                keyColumn: "Id",
                keyValue: 16,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 1,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 2,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 3,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 4,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 5,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 6,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 7,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 8,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 9,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 10,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 11,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 12,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 13,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 14,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 15,
                column: "ArrangementId",
                value: null);

            migrationBuilder.UpdateData(
                table: "WrapperVariant",
                keyColumn: "Id",
                keyValue: 16,
                column: "ArrangementId",
                value: null);

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
                name: "FK_ArrangementType_Arrangement_ArrangementId",
                table: "ArrangementType",
                column: "ArrangementId",
                principalTable: "Arrangement",
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
    }
}
