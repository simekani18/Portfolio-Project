using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Experiences.UpdateExperience;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/experiences/{id:guid}", async (Guid id, Request request, IMediator mediator, IValidator<Command> validator) =>
        {
            var command = new Command(
                id,
                request.Company,
                request.Title,
                request.Location,
                request.StartDate,
                request.EndDate,
                request.IsCurrent,
                request.Description,
                request.Technologies,
                request.DisplayOrder
            );

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
        .WithName("UpdateExperience")
        .WithTags("Experiences")
        .RequireAuthorization()  // Admin only
        .Produces<Response>(StatusCodes.Status200OK)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status404NotFound)
        .Produces(StatusCodes.Status401Unauthorized);
    }
}
