using System;
using Microsoft.EntityFrameworkCore;
using TeenyWeenyURL.Data;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;

namespace TeenyWeenyURL.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<User?> CreateUser(CreateUserRequest request)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(i => i.Username == request.Username);
        if (existingUser != null)
        {
            return null;
        }
        var user = new User
        {
            Username = request.Username,
            Password = request.Password,
            CreatedAt = DateTime.UtcNow,
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }
}
