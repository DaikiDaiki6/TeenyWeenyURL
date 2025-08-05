using System;
using Microsoft.AspNetCore.Mvc;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

[ApiController]
[Route("api/[controller]")]
public class ShortUrlsController : ControllerBase
{
    private readonly IShortUrlService _shortUrlService;
    public ShortUrlsController(IShortUrlService shortUrlService)
    {
        _shortUrlService = shortUrlService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateShortUrlRequest request)
    {
        var shortCode = await _shortUrlService.CreateShortUrlAsync(request);
        return Ok(new { ShortUrl = $"https://twurl.com/{shortCode}" });
    }

    [HttpGet("{shortcode}")]
    public async Task<IActionResult> RedirectToOriginal(string shortcode)
    {
        var originalUrl = await _shortUrlService.GetOriginalUrlAsync(shortcode);
        if (originalUrl == null) return NotFound("Short URL not found");
        return Redirect(originalUrl);
    }
}
