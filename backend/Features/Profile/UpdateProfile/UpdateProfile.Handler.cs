using MediatR;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database;

namespace PortfolioApi.Features.Profile.UpdateProfile;

public class Handler : IRequestHandler<Command, Response?>
{
    private readonly PortfolioDbContext _db;
    private readonly ILogger<Handler> _logger;

    public Handler(PortfolioDbContext db, ILogger<Handler> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<Response?> Handle(Command request, CancellationToken cancellationToken)
    {
        var profile = await _db.Profiles.FirstOrDefaultAsync(cancellationToken);

        if (profile == null)
        {
            _logger.LogWarning("Profile not found during update operation");
            return null;
        }

        profile.FullName = request.FullName;
        profile.Title = request.Title;
        profile.Summary = request.Summary;
        profile.Bio = request.Bio;
        profile.Email = request.Email;
        profile.Phone = request.Phone;
        profile.WhatsAppNumber = request.WhatsAppNumber;
        profile.Location = request.Location;
        profile.GithubUrl = request.GithubUrl;
        profile.LinkedInUrl = request.LinkedInUrl;
        profile.TwitterUrl = request.TwitterUrl;
        profile.CalendlyUrl = request.CalendlyUrl;
        profile.PortfolioUrl = request.PortfolioUrl;
        profile.ProfileImageUrl = request.ProfileImageUrl;
        profile.ResumePdfUrl = request.ResumePdfUrl;
        profile.YearsOfExperience = request.YearsOfExperience;
        profile.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Profile updated successfully for {FullName}", profile.FullName);

        return new Response(
            profile.Id,
            profile.FullName,
            profile.Title,
            profile.Bio,
            profile.Email,
            profile.UpdatedAt
        );
    }
}
