using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Experiences.CreateExperience;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/experiences", async (Request request, IMediator mediator, IValidator<Command> validator) =>
        {
            var command = new Command(
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

            var response = await mediator.Send(command);

            return Results.Created($"/api/experiences/{response.Id}", response);
        })
        .WithName("CreateExperience")
        .WithTags("Experiences")
        .RequireAuthorization()  // Admin only
        .Produces<Response>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status401Unauthorized);
    }
}
