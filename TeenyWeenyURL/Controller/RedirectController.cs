using Microsoft.AspNetCore.Mvc;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

[ApiController]
[Route("")]  // Root route for short URLs like: http://localhost:5140/44825e
public class RedirectController : ControllerBase
{
    private readonly IShortUrlService _shortUrlService;
    
    public RedirectController(IShortUrlService shortUrlService)
    {
        _shortUrlService = shortUrlService;
    }

    [HttpGet("{shortcode}")]
    public async Task<IActionResult> RedirectToOriginal(string shortcode)
    {
        var originalUrl = await _shortUrlService.GetOriginalUrlAsync(shortcode);
        if (originalUrl == null) 
            return NotFound(new { message = "Short URL not found" });
        
        return Redirect(originalUrl);
    }
} 