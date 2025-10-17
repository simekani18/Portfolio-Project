using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PortfolioApi.Database;

namespace PortfolioApi.Features.Auth.Login;

public class Handler : IRequestHandler<Command, Response?>
{
    private readonly PortfolioDbContext _db;
    private readonly IConfiguration _configuration;
    private readonly ILogger<Handler> _logger;

    public Handler(PortfolioDbContext db, IConfiguration configuration, ILogger<Handler> logger)
    {
        _db = db;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<Response?> Handle(Command request, CancellationToken cancellationToken)
    {
        var adminUser = await _db.AdminUsers
            .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

        if (adminUser == null)
        {
            _logger.LogWarning("Login attempt failed - invalid credentials");
            await Task.Delay(Random.Shared.Next(100, 500), cancellationToken);
            return null;
        }

        if (!BCrypt.Net.BCrypt.Verify(request.Password, adminUser.PasswordHash))
        {
            _logger.LogWarning("Login attempt failed for user ID: {UserId}", adminUser.Id);
            await Task.Delay(Random.Shared.Next(100, 500), cancellationToken);
            return null;
        }

        var token = GenerateJwtToken(adminUser.Id, adminUser.Username);

        adminUser.LastLoginAt = DateTime.UtcNow;
        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("User ID {UserId} logged in successfully", adminUser.Id);

        return new Response(token, "Bearer", 24 * 60 * 60);
    }

    private string GenerateJwtToken(Guid userId, string username)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey not configured");
        var issuer = jwtSettings["Issuer"] ?? throw new InvalidOperationException("JWT Issuer not configured");
        var audience = jwtSettings["Audience"] ?? throw new InvalidOperationException("JWT Audience not configured");

        var now = DateTime.UtcNow;
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, username),
            new Claim(ClaimTypes.Role, "Admin"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            notBefore: now,
            expires: now.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
