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
    public UserController(IUserService userService)
    {
        _userservice = userService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserRequest request)
    {
        var newUser = await _userservice.CreateUserAsync(request);
        if (newUser is null) return Conflict(new { message = "Username already exists." });
        return Ok(new
        {
            newUser.Id,
            newUser.Username,
            newUser.CreatedAt
        });
    }

    [HttpPatch("{id:int}")]
    public async Task<IActionResult> EditUser(EditUserRequest request, int id)
    {
        var user = await _userservice.EditUserAsync(request, id);
        if (user is null) return NotFound(new { message = "User is not found." });
        return Ok(user);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _userservice.DeleteUserAsync(id);
        if (!user) return NotFound(new { message = "User is not found." });
        return NoContent();
    }
}
