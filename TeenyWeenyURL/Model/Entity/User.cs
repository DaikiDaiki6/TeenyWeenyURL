using System;

namespace TeenyWeenyURL.Model.Entity;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    // Relationship for URLs can be none if first time user
    public List<ShortUrl> Urls { get; set; } = new();
}
