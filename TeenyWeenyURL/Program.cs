using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TeenyWeenyURL.Data;
using TeenyWeenyURL.Model.JwtConfiguration;
using TeenyWeenyURL.Services;

var builder = WebApplication.CreateBuilder(args);

// DATABASE SETTINGS
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// AUTH -- JWT SETTINGS
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>()!;
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.AddScoped<TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
        };
    });
builder.Services.AddAuthorization();

// SWAGGER -- API SETTINGS
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SERVICES SETTINGS 
builder.Services.AddScoped<IShortUrlService, ShortUrlService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<AuthService>();

// CONTROLLERS SETTINGS 
builder.Services.AddControllers();

// CORS SETTINGS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// SWAGGER RUN
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// AUTH RUN
app.UseAuthentication();
app.UseAuthorization();

// CORS RUN
app.UseCors("AllowAll");

// HTTPS RUN
app.UseHttpsRedirection();

// CONTROLLERS RUN
app.MapControllers();
app.Run();

