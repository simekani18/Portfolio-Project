using MediatR;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database;

namespace PortfolioApi.Features.Profile.GetProfile;

public class Handler : IRequestHandler<Query, Response?>
{
    private readonly PortfolioDbContext _db;

    public Handler(PortfolioDbContext db)
    {
        _db = db;
    }

    public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
    {
        var profile = await _db.Profiles
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        if (profile == null)
        {
            return null;
        }

        return new Response(
            profile.Id,
            profile.FullName,
            profile.Title,
            profile.Summary,
            profile.Bio,
            profile.Email,
            profile.Phone,
            profile.WhatsAppNumber,
            profile.Location,
            profile.GithubUrl,
            profile.LinkedInUrl,
            profile.TwitterUrl,
            profile.CalendlyUrl,
            profile.PortfolioUrl,
            profile.ProfileImageUrl,
            profile.ResumePdfUrl,
            profile.YearsOfExperience
        );
    }
}
