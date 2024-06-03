using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Enflorarte.CRM.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveryFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveryUntil = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveryType = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PaymentStatus = table.Column<int>(type: "int", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CommandGenerated = table.Column<bool>(type: "bit", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ReferenceImage = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ResultImage = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OrderPrice = table.Column<decimal>(type: "decimal(12,10)", precision: 12, scale: 10, nullable: false),
                    RealizationPrice = table.Column<decimal>(type: "decimal(12,10)", precision: 12, scale: 10, nullable: false),
                    ShippingPrice = table.Column<decimal>(type: "decimal(12,10)", precision: 12, scale: 10, nullable: false),
                    MoneyPaid = table.Column<decimal>(type: "decimal(12,10)", precision: 12, scale: 10, nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    WasDelivered = table.Column<bool>(type: "bit", nullable: false),
                    RecipientName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    RecipientCellphoneNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArrangementOrder",
                columns: table => new
                {
                    ArrangementId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArrangementOrder", x => new { x.ArrangementId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_ArrangementOrder_Arrangement_ArrangementId",
                        column: x => x.ArrangementId,
                        principalTable: "Arrangement",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArrangementOrder_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BranchOrder",
                columns: table => new
                {
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchOrder", x => new { x.BranchId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_BranchOrder_Branch_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branch",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BranchOrder_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CommunicationTypeOrder",
                columns: table => new
                {
                    CommunicationTypeId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunicationTypeOrder", x => new { x.CommunicationTypeId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_CommunicationTypeOrder_CommunicationType_CommunicationTypeId",
                        column: x => x.CommunicationTypeId,
                        principalTable: "CommunicationType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommunicationTypeOrder_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderResponsible",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ResponsibleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderResponsible", x => new { x.OrderId, x.ResponsibleId });
                    table.ForeignKey(
                        name: "FK_OrderResponsible_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderResponsible_Responsible_ResponsibleId",
                        column: x => x.ResponsibleId,
                        principalTable: "Responsible",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArrangementOrder_OrderId",
                table: "ArrangementOrder",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_BranchOrder_OrderId",
                table: "BranchOrder",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_CommunicationTypeOrder_OrderId",
                table: "CommunicationTypeOrder",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderResponsible_ResponsibleId",
                table: "OrderResponsible",
                column: "ResponsibleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArrangementOrder");

            migrationBuilder.DropTable(
                name: "BranchOrder");

            migrationBuilder.DropTable(
                name: "CommunicationTypeOrder");

            migrationBuilder.DropTable(
                name: "OrderResponsible");

            migrationBuilder.DropTable(
                name: "Order");
        }
    }
}
