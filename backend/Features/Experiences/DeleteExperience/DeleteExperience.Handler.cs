using MediatR;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database;

namespace PortfolioApi.Features.Experiences.DeleteExperience;

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

        _db.Experiences.Remove(experience);
        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Experience deleted successfully: {Company} - {Title}", experience.Company, experience.Title);

        return new Response(
            Success: true,
            Message: $"Experience '{experience.Company} - {experience.Title}' deleted successfully"
        );
    }
}
