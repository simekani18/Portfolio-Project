namespace PortfolioApi.Features.Profile.GetProfile;

public record Response(
    Guid Id,
    string FullName,
    string Title,
    string? Summary,
    string? Bio,
    string? Email,
    string? Phone,
    string? WhatsAppNumber,
    string? Location,
    string? GithubUrl,
    string? LinkedInUrl,
    string? TwitterUrl,
    string? CalendlyUrl,
    string? PortfolioUrl,
    string? ProfileImageUrl,
    string? ResumePdfUrl,
    int? YearsOfExperience
);
