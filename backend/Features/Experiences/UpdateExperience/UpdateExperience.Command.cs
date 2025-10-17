using MediatR;

namespace PortfolioApi.Features.Experiences.UpdateExperience;

public record Command(
    Guid Id,
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
