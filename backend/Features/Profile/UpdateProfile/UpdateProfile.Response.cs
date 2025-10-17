namespace PortfolioApi.Features.Profile.UpdateProfile;

public record Response(
    Guid Id,
    string FullName,
    string Title,
    string? Bio,
    string? Email,
    DateTime UpdatedAt
);
