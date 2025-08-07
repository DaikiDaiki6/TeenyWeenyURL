using System;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace TeenyWeenyURL.Model.DTO;

/// <summary>
/// Request model for creating a new shortened URL
/// </summary>
[SwaggerSchema(Description = "Request model for creating a new shortened URL")]
public class EditShortUrlRequest
{

    /// <summary>
    /// The Note for the Short URL (optional)
    /// </summary>
    /// <example>Short URL for a youtube video</example>
    [StringLength(5000, ErrorMessage = "Note cannot exceed 5000 characters")]
    [SwaggerSchema(Description = "The Note for the Short URL (optional)")]
    public string? Note { get; set; }
}
