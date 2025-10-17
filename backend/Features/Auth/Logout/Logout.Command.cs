using MediatR;

namespace PortfolioApi.Features.Auth.Logout;

public record Command(string Token) : IRequest<Response>;
