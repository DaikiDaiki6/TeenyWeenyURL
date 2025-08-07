using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TeenyWeenyURL.Model.DTO;
using TeenyWeenyURL.Services;

namespace TeenyWeenyURL.Controller;

/// <summary>
/// Controller for handling user authentication operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
[SwaggerTag("Authentication operations including user registration and login")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly ILogger<AuthController> _logger;

    /// <summary>
    /// Initializes a new instance of the AuthController
    /// </summary>
    /// <param name="authService">The authentication service</param>
    /// <param name="logger">The logger</param>
    public AuthController(AuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Registers a new user account
    /// </summary>
    /// <param name="request">The user registration request</param>
    /// <returns>User information if registration successful</returns>
    /// <response code="200">User successfully registered</response>
    /// <response code="409">User already exists</response>
    /// <response code="400">Invalid request data</response>
    /// <response code="500">Internal server error</response>
    [HttpPost("register")]
    [SwaggerOperation(
        Summary = "Register a new user",
        Description = "Creates a new user account with the provided username and password",
        OperationId = "RegisterUser",
        Tags = new[] { "Authentication" }
    )]
    [SwaggerResponse(200, "User successfully registered", typeof(object))]
    [SwaggerResponse(409, "User already exists")]
    [SwaggerResponse(400, "Invalid request data")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> Register(CreateUserRequest request)
    {
        _logger.LogInformation("User registration attempt: {Username}", request.Username);

        try
        {
            var newUser = await _authService.CreateUser(request);
            if (newUser is null)
            {
                _logger.LogWarning("User registration failed - username already exists: {Username}", request.Username);
                return Conflict(new { message = "User already exists." });
            }

            _logger.LogInformation("User registered successfully: {Username} with ID: {UserId}",
                newUser.Username, newUser.Id);

            return Ok(new
            {
                newUser.Id,
                newUser.Username,
                newUser.CreatedAt
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error registering user: {Username}", request.Username);
            return StatusCode(500, new { message = "Internal server error during registration." });
        }
    }

    /// <summary>
    /// Authenticates a user and returns a JWT token
    /// </summary>
    /// <param name="request">The login request</param>
    /// <returns>JWT token if authentication successful</returns>
    /// <response code="200">Login successful</response>
    /// <response code="401">Invalid credentials</response>
    /// <response code="400">Invalid request data</response>
    /// <response code="500">Internal server error</response>
    [HttpPost("login")]
    [SwaggerOperation(
        Summary = "Login user",
        Description = "Authenticates a user with username and password, returns JWT token",
        OperationId = "LoginUser",
        Tags = new[] { "Authentication" }
    )]
    [SwaggerResponse(200, "Login successful", typeof(object))]
    [SwaggerResponse(401, "Invalid credentials")]
    [SwaggerResponse(400, "Invalid request data")]
    [SwaggerResponse(500, "Internal server error")]
    public async Task<IActionResult> Login(LoginUserRequest request)
    {
        _logger.LogInformation("User login attempt: {Username}", request.Username);

        try
        {
            var token = await _authService.LoginUser(request);
            if (token is null)
            {
                _logger.LogWarning("Login failed - invalid credentials for user: {Username}", request.Username);
                return Unauthorized(new { message = "Invalid credentials." });
            }

            _logger.LogInformation("User logged in successfully: {Username}", request.Username);

            return Ok(new
            {
                message = "Login Successful.",
                token
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error logging in user: {Username}", request.Username);
            return StatusCode(500, new { message = "Internal server error during login." });
        }
    }

    [Authorize]
    [HttpGet("check")]
    public IActionResult TestAuth()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var username = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;

        _logger.LogInformation("Authentication check for user: {Username} (ID: {UserId})", username, userId);
        return Ok(new
        {
            userId = userId,
            username = username,
            message = "Authenticated!",
            timestamp = DateTime.UtcNow,
        });
    }
}
