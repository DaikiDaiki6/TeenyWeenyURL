using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace TeenyWeenyURL.Model.DTO;

/// <summary>
/// Response model for shortened URL information
/// </summary>
[SwaggerSchema(Description = "Response model containing information about a shortened URL")]
public class ShortUrlResponse
{
    /// <summary>
    /// The short code used to identify the shortened URL
    /// </summary>
    /// <example>abc123</example>
    [SwaggerSchema(Description = "The short code used to identify the shortened URL")]
    public string ShortCode { get; set; } = null!;
    
    /// <summary>
    /// The original URL that was shortened
    /// </summary>
    /// <example>https://www.example.com/very-long-url-that-needs-to-be-shortened</example>
    [SwaggerSchema(Description = "The original URL that was shortened")]
    public string OriginalUrl { get; set; } = null!;
    
    /// <summary>
    /// The number of times this shortened URL has been clicked
    /// </summary>
    /// <example>42</example>
    [SwaggerSchema(Description = "The number of times this shortened URL has been clicked")]
    public int Clicks { get; set; }
    
    /// <summary>
    /// The date and time when this shortened URL was created
    /// </summary>
    /// <example>2024-01-15T10:30:00Z</example>
    [SwaggerSchema(Description = "The date and time when this shortened URL was created")]
    public DateTime CreatedAt { get; set; }
    
    /// <summary>
    /// The note associated with this shortened URL (optional)
    /// </summary>
    /// <example>Short URL for a youtube video</example>
    [SwaggerSchema(Description = "The note associated with this shortened URL (optional)")]
    public string? Note { get; set; }
}
