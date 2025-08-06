using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace TeenyWeenyURL.Model.DTO;

/// <summary>
/// Request model for creating a new user account
/// </summary>
[SwaggerSchema(Description = "Request model for creating a new user account")]
public class CreateUserRequest
{
    /// <summary>
    /// The username for the new account. Must be 3-50 characters and contain only letters, numbers, underscores, and hyphens
    /// </summary>
    /// <example>john_doe</example>
    [Required(ErrorMessage = "Username is required")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
    [RegularExpression(@"^[a-zA-Z0-9_-]+$", ErrorMessage = "Username can only contain letters, numbers, underscores, and hyphens")]
    [SwaggerSchema(Description = "The username for the new account. Must be 3-50 characters and contain only letters, numbers, underscores, and hyphens")]
    public string Username { get; set; } = null!;
    
    /// <summary>
    /// The password for the new account. Must be 6-100 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    /// </summary>
    /// <example>MySecureP@ss123</example>
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]", 
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
    [SwaggerSchema(Description = "The password for the new account. Must be 6-100 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
    public string Password { get; set; } = null!;
}
