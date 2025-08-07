using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeenyWeenyURL.Migrations
{
    /// <inheritdoc />
    public partial class AddNoteToShortUrls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "ShortUrls",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "ShortUrls");
        }
    }
}
