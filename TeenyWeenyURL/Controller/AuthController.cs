using System;
using Microsoft.AspNetCore.Mvc;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(CreateUserRequest request)
    {
        var newUser = await _authService.CreateUser(request);
        if (newUser is null) return Conflict(new { message = "User already exists." });

        return Ok(new
        {
            newUser.Id,
            newUser.Username,
            newUser.CreatedAt
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginUserRequest request)
    {
        var token = await _authService.LoginUser(request); 
        if (token is null) return Unauthorized(new { message = "Invalid credentials." });

        return Ok(new
        {
            message = "Login Successful.",
            token
        });
    }
}
