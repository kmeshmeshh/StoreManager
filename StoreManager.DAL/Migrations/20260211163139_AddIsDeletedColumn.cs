using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreManager.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddIsDeletedColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // هذا هو السطر الوحيد الذي نحتاجه: إضافة العمود للجدول الموجود
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // في حالة التراجع، نحذف العمود فقط وليس الجداول
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Products");
        }
    }
}