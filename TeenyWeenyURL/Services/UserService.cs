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
    
    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null) return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<User?> EditUserAsync(EditUserRequest request, int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return null;

        if (!string.IsNullOrEmpty(request.Username))
        {
            user.Username = request.Username;
        }
        if (!string.IsNullOrEmpty(request.Password))
        {
            user.Password = request.Password;
        }

        await _context.SaveChangesAsync();
        return user;
    }
}
