using System;

namespace TeenyWeenyURL.Model.Entity;

public class ShortUrl
{
    public int Id { get; set; }
    public string OriginalUrl { get; set; } = null!;
    public string ShortCode { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Clicks { get; set; }
    // Required relationship with User
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}
