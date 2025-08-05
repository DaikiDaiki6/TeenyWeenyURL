using System;

namespace TeenyWeenyURL.Model.DTO;

public class CreateShortUrlRequest
{
    public string OriginalUrl { get; set; } = null!;
    public int UserId { get; set; }
}
