using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Experiences.DeleteExperience;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/experiences/{id:guid}", async (Guid id, IMediator mediator, IValidator<Command> validator) =>
        {
            var command = new Command(id);

            var validationResult = await validator.ValidateAsync(command);
            if (!validationResult.IsValid)
            {
                return Results.ValidationProblem(validationResult.ToDictionary());
            }

            try
            {
                var response = await mediator.Send(command);
                return Results.Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return Results.NotFound(new { error = ex.Message });
            }
        })
        .WithName("DeleteExperience")
        .WithTags("Experiences")
        .RequireAuthorization()  // Admin only
        .Produces<Response>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .Produces(StatusCodes.Status401Unauthorized);
    }
}
