using System.IdentityModel.Tokens.Jwt;
using MediatR;
using PortfolioApi.Shared.Services;

namespace PortfolioApi.Features.Auth.Logout;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly ITokenBlacklistService _blacklistService;
    private readonly ILogger<Handler> _logger;

    public Handler(ITokenBlacklistService blacklistService, ILogger<Handler> logger)
    {
        _blacklistService = blacklistService;
        _logger = logger;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(request.Token);

        var expiration = jwtToken.ValidTo;
        await _blacklistService.BlacklistTokenAsync(request.Token, expiration);

        var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
        _logger.LogInformation("User ID {UserId} logged out successfully", userId);

        return new Response("Successfully logged out");
    }
}
