using MediatR;
using Microsoft.AspNetCore.Authorization;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Auth.TokenIntrospection;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/token/introspect", [Authorize] async (HttpContext context, IMediator mediator) =>
        {
            var authHeader = context.Request.Headers.Authorization.FirstOrDefault();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Results.Unauthorized();
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var query = new Query(token);

            var response = await mediator.Send(query);

            return Results.Ok(response);
        })
        .WithName("TokenIntrospection")
        .WithTags("Authentication")
        .Produces<Response>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status401Unauthorized)
        .RequireAuthorization();
    }
}
