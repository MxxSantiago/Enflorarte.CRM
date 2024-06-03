using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Enflorarte.CRM.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class OrderFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryType",
                table: "Order");

            migrationBuilder.AlterColumn<decimal>(
                name: "ShippingPrice",
                table: "Order",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,10)",
                oldPrecision: 12,
                oldScale: 10);

            migrationBuilder.AlterColumn<decimal>(
                name: "RealizationPrice",
                table: "Order",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,10)",
                oldPrecision: 12,
                oldScale: 10);

            migrationBuilder.AlterColumn<decimal>(
                name: "OrderPrice",
                table: "Order",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,10)",
                oldPrecision: 12,
                oldScale: 10);

            migrationBuilder.AlterColumn<decimal>(
                name: "MoneyPaid",
                table: "Order",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,10)",
                oldPrecision: 12,
                oldScale: 10);

            migrationBuilder.CreateTable(
                name: "DeliveryTypeOrder",
                columns: table => new
                {
                    DeliveryTypeId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryTypeOrder", x => new { x.DeliveryTypeId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_DeliveryTypeOrder_DeliveryType_DeliveryTypeId",
                        column: x => x.DeliveryTypeId,
                        principalTable: "DeliveryType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryTypeOrder_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryTypeOrder_OrderId",
                table: "DeliveryTypeOrder",
                column: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeliveryTypeOrder");

            migrationBuilder.AlterColumn<decimal>(
                name: "ShippingPrice",
                table: "Order",
                type: "decimal(12,10)",
                precision: 12,
                scale: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "RealizationPrice",
                table: "Order",
                type: "decimal(12,10)",
                precision: 12,
                scale: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "OrderPrice",
                table: "Order",
                type: "decimal(12,10)",
                precision: 12,
                scale: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AlterColumn<decimal>(
                name: "MoneyPaid",
                table: "Order",
                type: "decimal(12,10)",
                precision: 12,
                scale: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldPrecision: 18,
                oldScale: 2);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryType",
                table: "Order",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }
    }
}
