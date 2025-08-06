using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace TeenyWeenyURL.Model.DTO;

/// <summary>
/// Request model for editing user information
/// </summary>
[SwaggerSchema(Description = "Request model for editing user information")]
public class EditUserRequest
{
    /// <summary>
    /// The new username. Must be 3-50 characters and contain only letters, numbers, underscores, and hyphens
    /// </summary>
    /// <example>new_username</example>
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
    [RegularExpression(@"^[a-zA-Z0-9_-]+$", ErrorMessage = "Username can only contain letters, numbers, underscores, and hyphens")]
    [SwaggerSchema(Description = "The new username. Must be 3-50 characters and contain only letters, numbers, underscores, and hyphens")]
    public string? Username { get; set; }
    
    /// <summary>
    /// The new password. Must be 6-100 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    /// </summary>
    /// <example>NewSecureP@ss123</example>
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]", 
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
    [SwaggerSchema(Description = "The new password. Must be 6-100 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
    public string? Password { get; set; }
}
