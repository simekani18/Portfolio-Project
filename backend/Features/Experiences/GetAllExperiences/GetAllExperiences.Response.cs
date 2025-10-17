namespace PortfolioApi.Features.Experiences.GetAllExperiences;

public record ExperienceDto(
    Guid Id,
    string Company,
    string Title,
    string? Location,
    DateOnly StartDate,
    DateOnly? EndDate,
    bool IsCurrent,
    string[] Description,
    string[] Technologies,
    int DisplayOrder
);

public record Response(List<ExperienceDto> Experiences);
