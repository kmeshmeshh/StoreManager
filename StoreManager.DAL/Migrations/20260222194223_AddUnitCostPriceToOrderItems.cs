using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreManager.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddUnitCostPriceToOrderItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UnitRefundPrice",
                table: "ReturnItems",
                newName: "UnitSellingPrice");

            migrationBuilder.AddColumn<int>(
                name: "OriginalOrderItemId",
                table: "ReturnItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RefundAmount",
                table: "ReturnItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "UnitCostPrice",
                table: "ReturnItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "UnitCostPrice",
                table: "OrderItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_ReturnItems_OriginalOrderItemId",
                table: "ReturnItems",
                column: "OriginalOrderItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnItems_ProductId",
                table: "ReturnItems",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReturnItems_OrderItems_OriginalOrderItemId",
                table: "ReturnItems",
                column: "OriginalOrderItemId",
                principalTable: "OrderItems",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReturnItems_Products_ProductId",
                table: "ReturnItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReturnItems_OrderItems_OriginalOrderItemId",
                table: "ReturnItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ReturnItems_Products_ProductId",
                table: "ReturnItems");

            migrationBuilder.DropIndex(
                name: "IX_ReturnItems_OriginalOrderItemId",
                table: "ReturnItems");

            migrationBuilder.DropIndex(
                name: "IX_ReturnItems_ProductId",
                table: "ReturnItems");

            migrationBuilder.DropColumn(
                name: "OriginalOrderItemId",
                table: "ReturnItems");

            migrationBuilder.DropColumn(
                name: "RefundAmount",
                table: "ReturnItems");

            migrationBuilder.DropColumn(
                name: "UnitCostPrice",
                table: "ReturnItems");

            migrationBuilder.DropColumn(
                name: "UnitCostPrice",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "UnitSellingPrice",
                table: "ReturnItems",
                newName: "UnitRefundPrice");
        }
    }
}
