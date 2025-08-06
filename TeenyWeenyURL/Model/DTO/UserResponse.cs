using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace TeenyWeenyURL.Model.DTO;

/// <summary>
/// Response model for user information including their shortened URLs
/// </summary>
[SwaggerSchema(Description = "Response model containing user information and their associated shortened URLs")]
public class UserResponse
{
    /// <summary>
    /// The unique username of the user
    /// </summary>
    /// <example>john_doe</example>
    [SwaggerSchema(Description = "The unique username of the user")]
    public string Username { get; set; } = null!;
    
    /// <summary>
    /// Collection of shortened URLs associated with this user
    /// </summary>
    [SwaggerSchema(Description = "Collection of shortened URLs associated with this user")]
    public List<ShortUrlResponse> Urls { get; set; } = new();
}
