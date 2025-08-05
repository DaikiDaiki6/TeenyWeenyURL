using System;
using System.ComponentModel.DataAnnotations;

namespace TeenyWeenyURL.Model.DTO;

public class LoginUserRequest
{
    [Required(ErrorMessage = "Username is required")]
    [StringLength(50, ErrorMessage = "Username cannot exceed 50 characters")]
    public string Username { get; set; } = null!;
    
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, ErrorMessage = "Password cannot exceed 100 characters")]
    public string Password { get; set; } = null!;
}
