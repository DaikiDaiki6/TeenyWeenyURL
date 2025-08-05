using System;
using TeenyWeenyURL.Model.DTO;

namespace TeenyWeenyURL.Services;

public interface IShortUrlService
{
    Task<string> CreateShortUrlAsync(CreateShortUrlRequest request);
    Task<string?> GetOriginalUrlAsync(string ShortCode);
}
