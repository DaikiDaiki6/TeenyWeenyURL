using System;

namespace TeenyWeenyURL.Model.DTO;

public class ShortUrlResponse
{
    public string ShortCode { get; set; } = null!;
    public string OriginalUrl { get; set; } = null!;
    public int Clicks { get; set; }
    public DateTime CreatedAt { get; set; }

}
