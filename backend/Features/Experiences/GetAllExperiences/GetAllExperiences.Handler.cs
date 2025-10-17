using MediatR;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database;

namespace PortfolioApi.Features.Experiences.GetAllExperiences;

public class Handler : IRequestHandler<Query, Response>
{
    private readonly PortfolioDbContext _db;

    public Handler(PortfolioDbContext db)
    {
        _db = db;
    }

    public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
    {
        var experiences = await _db.Experiences
            .AsNoTracking()
            .OrderBy(e => e.DisplayOrder)
            .ToListAsync(cancellationToken);

        var experienceDtos = experiences.Select(e => new ExperienceDto(
            e.Id,
            e.Company,
            e.Title,
            e.Location,
            e.StartDate,
            e.EndDate,
            e.IsCurrent,
            e.Description,
            e.Technologies,
            e.DisplayOrder
        )).ToList();

        return new Response(experienceDtos);
    }
}
