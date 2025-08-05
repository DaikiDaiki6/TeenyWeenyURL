using System;
using Microsoft.AspNetCore.Mvc;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userservice;
    public UserController(IUserService userService) {
        _userservice = userService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserRequest request)
    {
        var newUser = await _userservice.CreateUser(request);
        if (newUser is null) return Conflict(new { message = "Username already exists." });
        return Ok(new
        {
            newUser.Id,
            newUser.Username,
            newUser.CreatedAt
        });
    }
}
