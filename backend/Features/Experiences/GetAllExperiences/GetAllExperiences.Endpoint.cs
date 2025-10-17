using MediatR;
using Microsoft.AspNetCore.Http;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Experiences.GetAllExperiences;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/experiences", async (IMediator mediator) =>
        {
            var query = new Query();
            var response = await mediator.Send(query);

            return Results.Ok(response);
        })
        .WithName("GetAllExperiences")
        .WithTags("Experiences")
        .Produces<Response>(StatusCodes.Status200OK);
    }
}
