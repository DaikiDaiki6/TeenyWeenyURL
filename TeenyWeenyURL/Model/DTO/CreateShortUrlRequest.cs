using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace TeenyWeenyURL.Model.DTO;

/// <summary>
/// Request model for creating a new shortened URL
/// </summary>
[SwaggerSchema(Description = "Request model for creating a new shortened URL")]
public class CreateShortUrlRequest
{
    /// <summary>
    /// The original URL to be shortened
    /// </summary>
    /// <example>https://www.example.com/very-long-url-that-needs-to-be-shortened</example>
    [Required(ErrorMessage = "Original URL is required")]
    [Url(ErrorMessage = "Please enter a valid URL")]
    [StringLength(2048, ErrorMessage = "URL cannot exceed 2048 characters")]
    [SwaggerSchema(Description = "The original URL to be shortened")]
    public string OriginalUrl { get; set; } = null!;
    
    /// <summary>
    /// The ID of the user creating the shortened URL
    /// </summary>
    /// <example>1</example>
    [Required(ErrorMessage = "User ID is required")]
    [Range(1, int.MaxValue, ErrorMessage = "User ID must be a positive number")]
    [SwaggerSchema(Description = "The ID of the user creating the shortened URL")]
    public int UserId { get; set; }
}
