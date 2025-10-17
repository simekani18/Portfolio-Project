using MediatR;
using PortfolioApi.Database;
using PortfolioApi.Database.Entities;

namespace PortfolioApi.Features.Experiences.CreateExperience;

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
        var experience = new Experience
        {
            Company = request.Company,
            Title = request.Title,
            Location = request.Location,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsCurrent = request.IsCurrent,
            Description = request.Description.ToArray(),
            Technologies = request.Technologies.ToArray(),
            DisplayOrder = request.DisplayOrder,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Experiences.Add(experience);
        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Experience created successfully: {Company} - {Title}", experience.Company, experience.Title);

        return new Response(
            experience.Id,
            experience.Company,
            experience.Title,
            experience.StartDate,
            experience.IsCurrent,
            experience.CreatedAt
        );
    }
}
