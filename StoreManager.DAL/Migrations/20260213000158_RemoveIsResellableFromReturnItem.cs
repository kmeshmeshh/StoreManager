using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreManager.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIsResellableFromReturnItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsResellable",
                table: "ReturnItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsResellable",
                table: "ReturnItems",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
