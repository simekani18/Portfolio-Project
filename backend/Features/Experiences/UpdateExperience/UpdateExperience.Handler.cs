using MediatR;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database;

namespace PortfolioApi.Features.Experiences.UpdateExperience;

public class Handler : IRequestHandler<Command, Response>
{
    private readonly PortfolioDbContext _db;
    private readonly ILogger<Handler> _logger;

    public Handler(PortfolioDbContext db, ILogger<Handler> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
    {
        var experience = await _db.Experiences
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (experience is null)
        {
            throw new KeyNotFoundException($"Experience with ID {request.Id} not found");
        }

        experience.Company = request.Company;
        experience.Title = request.Title;
        experience.Location = request.Location;
        experience.StartDate = request.StartDate;
        experience.EndDate = request.EndDate;
        experience.IsCurrent = request.IsCurrent;
        experience.Description = request.Description.ToArray();
        experience.Technologies = request.Technologies.ToArray();
        experience.DisplayOrder = request.DisplayOrder;
        experience.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Experience updated successfully: {Company} - {Title}", experience.Company, experience.Title);

        return new Response(
            experience.Id,
            experience.Company,
            experience.Title,
            experience.StartDate,
            experience.IsCurrent,
            experience.UpdatedAt
        );
    }
}
