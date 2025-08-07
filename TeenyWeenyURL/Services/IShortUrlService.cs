using System;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;

namespace TeenyWeenyURL.Services;

public interface IShortUrlService
{
    Task<PaginatedUrlsResponse<ShortUrlResponse>?> GetShortUrlsPerUsersId(int id, int page, int pageSize);
    Task<string> CreateShortUrlAsync(CreateShortUrlRequest request);
    Task<string?> GetOriginalUrlAsync(string shortCode);
    Task<bool> DeleteShortUrlAsync(int id, int userId);
}
