using MediatR;

namespace PortfolioApi.Features.Profile.GetProfile;

public record Query : IRequest<Response?>;
