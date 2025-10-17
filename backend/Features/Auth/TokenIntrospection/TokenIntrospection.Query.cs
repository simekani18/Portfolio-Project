using MediatR;

namespace PortfolioApi.Features.Auth.TokenIntrospection;

public record Query(string Token) : IRequest<Response>;
