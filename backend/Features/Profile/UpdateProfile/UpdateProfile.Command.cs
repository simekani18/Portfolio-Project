using MediatR;

namespace PortfolioApi.Features.Profile.UpdateProfile;

public record Command(
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
) : IRequest<Response?>;
