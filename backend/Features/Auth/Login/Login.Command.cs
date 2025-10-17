using MediatR;

namespace PortfolioApi.Features.Auth.Login;

public record Command(string Username, string Password) : IRequest<Response?>;
