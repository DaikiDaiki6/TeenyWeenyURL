using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ShortUrlsController : ControllerBase
{
    private readonly IShortUrlService _shortUrlService;
    public ShortUrlsController(IShortUrlService shortUrlService)
    {
        _shortUrlService = shortUrlService;
    }

    [HttpPost("create-twurl")]
    public async Task<IActionResult> CreateShortUrl(CreateShortUrlRequest request)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            return Unauthorized();
        }
        request.UserId = userId;
        var shortCode = await _shortUrlService.CreateShortUrlAsync(request);
        return Ok(new { ShortUrl = $"https://twurl.com/{shortCode}" });
    }

    [HttpGet("all-urls")]
    public async Task<IActionResult> GetShortUrlPerUserId()
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            return Unauthorized();
        }

        var shortUrls = await _shortUrlService.GetShortUrlsPerUsersId(userId);
        if (shortUrls is null) return NotFound(new { message = "No Short Urls Found." });
        return Ok(shortUrls);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteShortUrl(int id)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            return Unauthorized();
        }
        var shortCode = await _shortUrlService.DeleteShortUrlAsync(id, userId);
        if (!shortCode) return NotFound(new { message = "Short URL not found" });
        return NoContent();
    }
}
