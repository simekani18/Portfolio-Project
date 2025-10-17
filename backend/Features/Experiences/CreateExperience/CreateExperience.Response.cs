namespace PortfolioApi.Features.Experiences.CreateExperience;

public record Response(
    Guid Id,
    string Company,
    string Title,
    DateOnly StartDate,
    bool IsCurrent,
    DateTime CreatedAt
);
