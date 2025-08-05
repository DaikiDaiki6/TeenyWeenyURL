using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TeenyWeenyURL.Model.Entity;
using TeenyWeenyURL.Model.JwtConfiguration;

namespace TeenyWeenyURL.Services;

public class TokenService
{
    private readonly JwtSettings _jwtsettings;

    public TokenService(IOptions<JwtSettings> jwtSettings)
    {
        _jwtsettings = jwtSettings.Value;
    }

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtsettings.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]{
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
        };

        var token = new JwtSecurityToken(
            issuer: _jwtsettings.Issuer,
            audience: _jwtsettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtsettings.ExpiryMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token); 
    }

    
}
