using MediatR;
using Microsoft.AspNetCore.Authorization;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Auth.Logout;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/logout", [Authorize] async (HttpContext context, IMediator mediator) =>
        {
            var authHeader = context.Request.Headers.Authorization.FirstOrDefault();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Results.Unauthorized();
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var command = new Command(token);

            var response = await mediator.Send(command);

            return Results.Ok(response);
        })
        .WithName("Logout")
        .WithTags("Authentication")
        .Produces<Response>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status401Unauthorized)
        .RequireAuthorization();
    }
}
