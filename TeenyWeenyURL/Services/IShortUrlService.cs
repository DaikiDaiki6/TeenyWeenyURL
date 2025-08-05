using System;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;

namespace TeenyWeenyURL.Services;

public interface IShortUrlService
{
    Task<List<ShortUrl>> GetShortUrlsPerUsersId(int id); 
    Task<string> CreateShortUrlAsync(CreateShortUrlRequest request);
    Task<string?> GetOriginalUrlAsync(string shortCode);
    Task<bool> DeleteShortUrlAsync(int id);
}
