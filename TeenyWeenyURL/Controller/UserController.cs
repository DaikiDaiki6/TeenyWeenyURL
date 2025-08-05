using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userservice;
    public UserController(IUserService userService)
    {
        _userservice = userService;
    }

    [HttpPatch("profile")]
    public async Task<IActionResult> EditMyProfile(EditUserRequest request)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            return Unauthorized();
        }

        var user = await _userservice.EditUserAsync(request, userId);
        if (user is null) return NotFound(new { message = "User is not found." });
        return Ok(user);
    }

    [HttpDelete("profile")]
    public async Task<IActionResult> DeleteMyProfile()
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            return Unauthorized();
        }

        var user = await _userservice.DeleteUserAsync(userId);
        if (!user) return NotFound(new { message = "User is not found." });
        return NoContent();
    }
}
