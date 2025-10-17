namespace PortfolioApi.Features.Experiences.UpdateExperience;

public record Response(
    Guid Id,
    string Company,
    string Title,
    DateOnly StartDate,
    bool IsCurrent,
    DateTime UpdatedAt
);
