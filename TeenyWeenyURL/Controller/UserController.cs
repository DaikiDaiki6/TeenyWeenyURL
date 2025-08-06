using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

/// <summary>
/// Controller for handling user profile operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
[SwaggerTag("User profile operations including editing and deletion")]
public class UserController : ControllerBase
{
    private readonly IUserService _userservice;
    private readonly ILogger<UserController> _logger;
    
    /// <summary>
    /// Initializes a new instance of the UserController
    /// </summary>
    /// <param name="userService">The user service</param>
    /// <param name="logger">The logger</param>
    public UserController(IUserService userService, ILogger<UserController> logger)
    {
        _userservice = userService;
        _logger = logger;
    }

    /// <summary>
    /// Updates the profile of the authenticated user
    /// </summary>
    /// <param name="request">The user update request</param>
    /// <returns>Updated user information</returns>
    /// <response code="200">User profile updated successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">User not found</response>
    /// <response code="400">Invalid request data</response>
    /// <response code="500">Internal server error</response>
    [HttpPatch("profile")]
    [SwaggerOperation(
        Summary = "Update user profile",
        Description = "Updates the profile information of the authenticated user",
        OperationId = "UpdateUserProfile",
        Tags = new[] { "User Profile" }
    )]
    [SwaggerResponse(200, "User profile updated successfully", typeof(UserResponse))]
    [SwaggerResponse(401, "User not authenticated")]
    [SwaggerResponse(404, "User not found")]
    [SwaggerResponse(400, "Invalid request data")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> EditMyProfile(EditUserRequest request)
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            _logger.LogWarning("Unauthorized access attempt to edit user profile");
            return Unauthorized();
        }

        _logger.LogInformation("Updating profile for user {UserId}", userId);

        try
        {
            var user = await _userservice.EditUserAsync(request, userId);
            if (user is null)
            {
                _logger.LogWarning("User {UserId} not found for profile update", userId);
                return NotFound(new { message = "User is not found." });
            }

            _logger.LogInformation("Profile updated successfully for user {UserId}", userId);
            return Ok(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating profile for user {UserId}", userId);
            return StatusCode(500, new { message = "Internal server error while updating profile." });
        }
    }

    /// <summary>
    /// Deletes the profile of the authenticated user
    /// </summary>
    /// <returns>No content if successful</returns>
    /// <response code="204">User profile deleted successfully</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">User not found</response>
    /// <response code="500">Internal server error</response>
    [HttpDelete("profile")]
    [SwaggerOperation(
        Summary = "Delete user profile",
        Description = "Deletes the profile of the authenticated user",
        OperationId = "DeleteUserProfile",
        Tags = new[] { "User Profile" }
    )]
    [SwaggerResponse(204, "User profile deleted successfully")]
    [SwaggerResponse(401, "User not authenticated")]
    [SwaggerResponse(404, "User not found")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> DeleteMyProfile()
    {
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(currentUserId) || !int.TryParse(currentUserId, out int userId))
        {
            _logger.LogWarning("Unauthorized access attempt to delete user profile");
            return Unauthorized();
        }

        _logger.LogInformation("Deleting profile for user {UserId}", userId);

        try
        {
            var user = await _userservice.DeleteUserAsync(userId);
            if (!user)
            {
                _logger.LogWarning("User {UserId} not found for deletion", userId);
                return NotFound(new { message = "User is not found." });
            }

            _logger.LogInformation("Profile deleted successfully for user {UserId}", userId);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting profile for user {UserId}", userId);
            return StatusCode(500, new { message = "Internal server error while deleting profile." });
        }
    }
}
