using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using PortfolioApi.Shared.Services;
using System.Text;

namespace PortfolioApi.Features.Auth.TokenIntrospection;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly IConfiguration _configuration;
    private readonly ITokenBlacklistService _blacklistService;

    public Handler(IConfiguration configuration, ITokenBlacklistService blacklistService)
    {
        _configuration = configuration;
        _blacklistService = blacklistService;
    }

    public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
    {
        try
        {
            if (await _blacklistService.IsTokenBlacklistedAsync(request.Token))
            {
                return new Response(false, null, null, null, null);
            }

            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secretKey!);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero
            };

            var principal = tokenHandler.ValidateToken(request.Token, validationParameters, out var validatedToken);
            var jwtToken = (JwtSecurityToken)validatedToken;

            var username = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.UniqueName)?.Value;
            var sub = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
            var exp = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp)?.Value;
            var iat = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Iat)?.Value;

            return new Response(
                Active: true,
                Username: username,
                Exp: exp != null ? long.Parse(exp) : null,
                Iat: iat != null ? long.Parse(iat) : null,
                Sub: sub
            );
        }
        catch
        {
            return new Response(false, null, null, null, null);
        }
    }
}
