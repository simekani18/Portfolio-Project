using MediatR;

namespace PortfolioApi.Features.Experiences.CreateExperience;

public record Command(
    string Company,
    string Title,
    string? Location,
    DateOnly StartDate,
    DateOnly? EndDate,
    bool IsCurrent,
    List<string> Description,
    List<string> Technologies,
    int DisplayOrder
) : IRequest<Response>;
