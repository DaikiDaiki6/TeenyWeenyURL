using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

/// <summary>
/// Controller for handling URL redirection operations
/// </summary>
[ApiController]
[Route("")]  // Root route for short URLs like: http://localhost:5140/44825e
[SwaggerTag("URL redirection operations for shortened URLs")]
public class RedirectController : ControllerBase
{
    private readonly IShortUrlService _shortUrlService;
    private readonly ILogger<RedirectController> _logger;
    
    /// <summary>
    /// Initializes a new instance of the RedirectController
    /// </summary>
    /// <param name="shortUrlService">The short URL service</param>
    /// <param name="logger">The logger</param>
    public RedirectController(IShortUrlService shortUrlService, ILogger<RedirectController> logger)
    {
        _shortUrlService = shortUrlService;
        _logger = logger;
    }

    /// <summary>
    /// Redirects a short code to its original URL
    /// </summary>
    /// <param name="shortcode">The short code to redirect</param>
    /// <returns>Redirect to the original URL</returns>
    /// <response code="302">Redirect to original URL</response>
    /// <response code="404">Short URL not found</response>
    /// <response code="500">Internal server error</response>
    [HttpGet("{shortcode:length(6,8)}")]
    [SwaggerOperation(
        Summary = "Redirect to original URL",
        Description = "Redirects a short code to its corresponding original URL",
        OperationId = "RedirectToOriginal",
        Tags = new[] { "Redirection" }
    )]
    [SwaggerResponse(302, "Redirect to original URL")]
    [SwaggerResponse(404, "Short URL not found")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> RedirectToOriginal(string shortcode)
    {
        _logger.LogInformation("Redirect attempt for shortcode: {Shortcode}", shortcode);
        
        try
        {
            var originalUrl = await _shortUrlService.GetOriginalUrlAsync(shortcode);
            if (originalUrl == null)
            {
                _logger.LogWarning("Short URL not found for shortcode: {Shortcode}", shortcode);
                return NotFound(new { message = "Short URL not found" });
            }

            _logger.LogInformation("Redirecting shortcode {Shortcode} to: {OriginalUrl}", shortcode, originalUrl);
            return Redirect(originalUrl);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error redirecting shortcode: {Shortcode}", shortcode);
            return StatusCode(500, new { message = "Internal server error during redirect." });
        }
    }
} 