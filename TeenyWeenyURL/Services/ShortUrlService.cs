using System;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TeenyWeenyURL.Data;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;

namespace TeenyWeenyURL.Services;

public class ShortUrlService : IShortUrlService
{
    private readonly AppDbContext _context;
    public ShortUrlService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<string> CreateShortUrlAsync(CreateShortUrlRequest request)
    {
        var shortCode = GenerateShortCode();

        var entity = new ShortUrl
        {
            OriginalUrl = request.OriginalUrl,
            ShortCode = shortCode,
            CreatedAt = DateTime.UtcNow,
            UserId = request.UserId
        };

        _context.ShortUrls.Add(entity);
        await _context.SaveChangesAsync();

        return shortCode;
    }

    public async Task<bool> DeleteShortUrlAsync(int id, int userId)
    {
        var shortUrl = await _context.ShortUrls.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);

        if (shortUrl is null) return false;
        
        _context.ShortUrls.Remove(shortUrl);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<string?> GetOriginalUrlAsync(string shortCode)
    {
        var entity = await _context.ShortUrls.FirstOrDefaultAsync(i => i.ShortCode == shortCode);
        if (entity != null)
        {
        entity.Clicks++;
        await _context.SaveChangesAsync();
        }
        return entity?.OriginalUrl;
    }

    public async Task<List<ShortUrl>?> GetShortUrlsPerUsersId(int id)
    {
        if (id <= 0) return null;

        List<ShortUrl> shortUrls = await _context.ShortUrls.Where(i => i.UserId == id).ToListAsync();
        return shortUrls;
    }

    private string GenerateShortCode()
    {
        return Guid.NewGuid().ToString("N")[..6];
    }
}
