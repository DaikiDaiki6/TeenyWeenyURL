using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace TeenyWeenyURL.Controller;

/// <summary>
/// Controller for handling shortened URL operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
[SwaggerTag("Shortened URL operations including creation, retrieval, and deletion")]
public class ShortUrlsController : ControllerBase
{
    private readonly IShortUrlService _shortUrlService;
    private readonly ILogger<ShortUrlsController> _logger;
    
    /// <summary>
    /// Initializes a new instance of the ShortUrlsController
    /// </summary>
    /// <param name="shortUrlService">The short URL service</param>
    /// <param name="logger">The logger</param>
    public ShortUrlsController(IShortUrlService shortUrlService, ILogger<ShortUrlsController> logger)
    {
        _shortUrlService = shortUrlService;
        _logger = logger;
    }

    /// <summary>
    /// Creates a new shortened URL for the authenticated user
    /// </summary>
    /// <param name="request">The request containing the original URL</param>
    /// <returns>The shortened URL</returns>
    /// <response code="200">Shortened URL created successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="400">Invalid request data</response>
    /// <response code="500">Internal server error</response>
    [HttpPost("create-twurl")]
    [SwaggerOperation(
        Summary = "Create a shortened URL",
        Description = "Creates a new shortened URL for the authenticated user",
        OperationId = "CreateShortUrl",
        Tags = new[] { "Short URLs" }
    )]
    [SwaggerResponse(200, "Shortened URL created successfully", typeof(object))]
    [SwaggerResponse(401, "User not authenticated")]
    [SwaggerResponse(400, "Invalid request data")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> CreateShortUrl(CreateShortUrlRequest request)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            _logger.LogWarning("Unauthorized access attempt to create short URL");
            return Unauthorized();
        }

        _logger.LogInformation("Creating short URL for user {UserId} with original URL: {OriginalUrl}", 
            userId, request.OriginalUrl);

        try
        {
            request.UserId = userId;
            var shortCode = await _shortUrlService.CreateShortUrlAsync(request);
            
            _logger.LogInformation("Short URL created successfully for user {UserId} with code: {ShortCode}", 
                userId, shortCode);
                
            return Ok(new { ShortUrl = $"https://twurl.com/{shortCode}" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating short URL for user {UserId} with original URL: {OriginalUrl}", 
                userId, request.OriginalUrl);
            return StatusCode(500, new { message = "Internal server error while creating short URL." });
        }
    }

    /// <summary>
    /// Retrieves all shortened URLs for the authenticated user
    /// </summary>
    /// <returns>List of shortened URLs</returns>
    /// <response code="200">Shortened URLs retrieved successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">No shortened URLs found</response>
    /// <response code="500">Internal server error</response>
    [HttpGet("all-urls")]
    [SwaggerOperation(
        Summary = "Get all shortened URLs for user",
        Description = "Retrieves all shortened URLs associated with the authenticated user",
        OperationId = "GetShortUrlsForUser",
        Tags = new[] { "Short URLs" }
    )]
    [SwaggerResponse(200, "Shortened URLs retrieved successfully", typeof(List<ShortUrlResponse>))]
    [SwaggerResponse(401, "User not authenticated")]
    [SwaggerResponse(404, "No shortened URLs found")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> GetShortUrlPerUserId()
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            _logger.LogWarning("Unauthorized access attempt to get short URLs");
            return Unauthorized();
        }

        _logger.LogInformation("Retrieving short URLs for user {UserId}", userId);

        try
        {
            var shortUrls = await _shortUrlService.GetShortUrlsPerUsersId(userId);
            if (shortUrls is null || !shortUrls.Any())
            {
                _logger.LogInformation("No short URLs found for user {UserId}", userId);
                return NotFound(new { message = "No Short Urls Found." });
            }

            _logger.LogInformation("Retrieved {Count} short URLs for user {UserId}", shortUrls.Count, userId);
            return Ok(shortUrls);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving short URLs for user {UserId}", userId);
            return StatusCode(500, new { message = "Internal server error while retrieving short URLs." });
        }
    }

    /// <summary>
    /// Deletes a specific shortened URL by ID
    /// </summary>
    /// <param name="id">The ID of the shortened URL to delete</param>
    /// <returns>No content if successful</returns>
    /// <response code="204">Shortened URL deleted successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">Shortened URL not found</response>
    /// <response code="500">Internal server error</response>
    [HttpDelete("{id:int}")]
    [SwaggerOperation(
        Summary = "Delete a shortened URL",
        Description = "Deletes a specific shortened URL by ID for the authenticated user",
        OperationId = "DeleteShortUrl",
        Tags = new[] { "Short URLs" }
    )]
    [SwaggerResponse(204, "Shortened URL deleted successfully")]
    [SwaggerResponse(401, "User not authenticated")]
    [SwaggerResponse(404, "Shortened URL not found")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> DeleteShortUrl(int id)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            _logger.LogWarning("Unauthorized access attempt to delete short URL {Id}", id);
            return Unauthorized();
        }

        _logger.LogInformation("Deleting short URL {Id} for user {UserId}", id, userId);

        try
        {
            var shortCode = await _shortUrlService.DeleteShortUrlAsync(id, userId);
            if (!shortCode)
            {
                _logger.LogWarning("Short URL {Id} not found for user {UserId}", id, userId);
                return NotFound(new { message = "Short URL not found" });
            }

            _logger.LogInformation("Short URL {Id} deleted successfully for user {UserId}", id, userId);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting short URL {Id} for user {UserId}", id, userId);
            return StatusCode(500, new { message = "Internal server error while deleting short URL." });
        }
    }
}
