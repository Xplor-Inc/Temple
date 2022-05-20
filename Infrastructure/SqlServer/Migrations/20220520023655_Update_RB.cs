using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Temple.SqlServer.Migrations
{
    public partial class Update_RB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gotra",
                table: "ReceiptBooks");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Date",
                table: "ReceiptBooks",
                type: "datetime",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "ReceiptBooks");

            migrationBuilder.AddColumn<string>(
                name: "Gotra",
                table: "ReceiptBooks",
                type: "varchar(56)",
                maxLength: 56,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
