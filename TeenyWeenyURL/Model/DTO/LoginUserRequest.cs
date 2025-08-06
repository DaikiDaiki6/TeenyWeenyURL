using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace TeenyWeenyURL.Model.DTO;

/// <summary>
/// Request model for user login
/// </summary>
[SwaggerSchema(Description = "Request model for user login")]
public class LoginUserRequest
{
    /// <summary>
    /// The username for login
    /// </summary>
    /// <example>john_doe</example>
    [Required(ErrorMessage = "Username is required")]
    [StringLength(50, ErrorMessage = "Username cannot exceed 50 characters")]
    [SwaggerSchema(Description = "The username for login")]
    public string Username { get; set; } = null!;
    
    /// <summary>
    /// The password for login
    /// </summary>
    /// <example>MySecureP@ss123</example>
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, ErrorMessage = "Password cannot exceed 100 characters")]
    [SwaggerSchema(Description = "The password for login")]
    public string Password { get; set; } = null!;
}
