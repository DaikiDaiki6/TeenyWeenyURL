using System;
using Microsoft.EntityFrameworkCore;
using TeenyWeenyURL.Data;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;
using BCrypt;

namespace TeenyWeenyURL.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null) return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<UserResponse?> EditUserAsync(EditUserRequest request, int id)
    {
        var user = await _context.Users
            .Include(u => u.Urls)
            .FirstOrDefaultAsync(u => u.Id == id);
            
        if (user == null) return null;

        // Check if username is being changed and if it's already taken
        if (!string.IsNullOrEmpty(request.Username) && request.Username != user.Username)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (existingUser != null) return null; // Username already taken
            
            user.Username = request.Username;
        }

        // Hash password if it's being changed
        if (!string.IsNullOrEmpty(request.Password))
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
        }

        await _context.SaveChangesAsync();
        
        // Return DTO to avoid circular references
        return new UserResponse
        {
            Username = user.Username,
            Urls = user.Urls.Select(u => new ShortUrlResponse
            {
                ShortCode = u.ShortCode,
                OriginalUrl = u.OriginalUrl,
                Clicks = u.Clicks,
                CreatedAt = u.CreatedAt
            }).ToList()
        };
    }
}
