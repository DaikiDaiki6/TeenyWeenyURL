using System;
using System.ComponentModel.DataAnnotations;

namespace TeenyWeenyURL.Model.DTO;

public class CreateShortUrlRequest
{
    [Required(ErrorMessage = "Original URL is required")]
    [Url(ErrorMessage = "Please enter a valid URL")]
    [StringLength(2048, ErrorMessage = "URL cannot exceed 2048 characters")]
    public string OriginalUrl { get; set; } = null!;
    
    [Required(ErrorMessage = "User ID is required")]
    [Range(1, int.MaxValue, ErrorMessage = "User ID must be a positive number")]
    public int UserId { get; set; }
}
