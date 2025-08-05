using System;

namespace TeenyWeenyURL.Model.DTO;

public class UserResponse
{
    public string Username { get; set; } = null!;
    public List<ShortUrlResponse> Urls { get; set; } = new();
}
