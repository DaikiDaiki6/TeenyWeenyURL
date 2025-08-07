using System;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using TeenyWeenyURL.Data;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;
using System.Text.RegularExpressions;

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
        // Validate short code format first
        if (!IsValidShortCode(shortCode))
        {
            return null;
        }

        var entity = await _context.ShortUrls.FirstOrDefaultAsync(i => i.ShortCode == shortCode);
        if (entity != null)
        {
            entity.Clicks++;
            await _context.SaveChangesAsync();
        }
        return entity?.OriginalUrl;
    }

    public async Task<PaginatedUrlsResponse<ShortUrlResponse>?> GetShortUrlsPerUsersId(int id, int page, int pageSize)
    {
        if (id <= 0) return null;

        var skip = (page - 1) * pageSize;

        var totalItems = await _context.ShortUrls
            .Where(i => i.UserId == id)
            .CountAsync();

        var shortUrls = await _context.ShortUrls
            .Where(i => i.UserId == id)
            .OrderByDescending(i => i.CreatedAt)
            .Skip(skip)
            .Take(pageSize)
            .Select(s => new ShortUrlResponse
            {
                ShortCode = s.ShortCode,
                OriginalUrl = s.OriginalUrl,
                Clicks = s.Clicks,
                CreatedAt = s.CreatedAt
            })
            .ToListAsync();

        var totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

        return new PaginatedUrlsResponse<ShortUrlResponse>
        {
            Items = shortUrls,
            CurrentPage = page,
            PageSize = pageSize,
            TotalItems = totalItems,
            TotalPages = totalPages,
            HasNextPage = page < totalPages,
            HasPreviousPage = page > 1
        };
    }

    private string GenerateShortCode()
    {
        return Guid.NewGuid().ToString("N")[..6];
    }

    /// <summary>
    /// Validates if the short code format is correct
    /// </summary>
    /// <param name="shortCode">The short code to validate</param>
    /// <returns>True if valid, false otherwise</returns>
    private static bool IsValidShortCode(string shortCode)
    {
        if (string.IsNullOrWhiteSpace(shortCode))
            return false;

        // Check length (should be 6 characters)
        if (shortCode.Length != 6)
            return false;

        // Check if it contains only alphanumeric characters
        if (!Regex.IsMatch(shortCode, @"^[a-zA-Z0-9]+$"))
            return false;

        return true;
    }
}
