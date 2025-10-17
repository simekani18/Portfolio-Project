using MediatR;
using Microsoft.AspNetCore.Http;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Profile.GetProfile;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/profile", async (IMediator mediator) =>
        {
            var query = new Query();
            var response = await mediator.Send(query);

            if (response == null)
            {
                return Results.NotFound(new { Message = "Profile not found" });
            }

            return Results.Ok(response);
        })
        .WithName("GetProfile")
        .WithTags("Profile")
        .Produces<Response>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound);
    }
}
