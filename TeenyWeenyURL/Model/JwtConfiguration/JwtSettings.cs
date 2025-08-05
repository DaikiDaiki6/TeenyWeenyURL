using System;

namespace TeenyWeenyURL.Model.JwtConfiguration;

public class JwtSettings
{
    public string SecretKey { get; set; } = String.Empty;
    public string Issuer { get; set; } = "TeenyWeenyURL";
    public string Audience { get; set; } = "TeenyWeenyFrontend";
    public int ExpiryMinutes { get; set; } = 60;

}
