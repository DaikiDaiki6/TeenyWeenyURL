using System;
using Microsoft.EntityFrameworkCore;
using TeenyWeenyURL.Data;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Model.Entity;
using BCrypt;

namespace TeenyWeenyURL.Services;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;
    public AuthService(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }
    public async Task<User?> CreateUser(CreateUserRequest request)
    {
        if (await _context.Users.AnyAsync(u => u.Username == request.Username)) return null;
        var user = new User
        {
            Username = request.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<string?> LoginUser(LoginUserRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password)) return null;

        var token = _tokenService.GenerateToken(user);

        return token;
    }
}
