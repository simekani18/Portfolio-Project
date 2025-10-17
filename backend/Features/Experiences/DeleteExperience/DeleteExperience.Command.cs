using MediatR;

namespace PortfolioApi.Features.Experiences.DeleteExperience;

public record Command(Guid Id) : IRequest<Response>;
