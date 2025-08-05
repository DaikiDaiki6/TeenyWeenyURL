using System;

namespace TeenyWeenyURL.Model.DTO;

public class EditUserRequest
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}
