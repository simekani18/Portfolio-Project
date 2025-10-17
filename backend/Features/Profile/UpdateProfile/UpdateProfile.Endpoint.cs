using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using PortfolioApi.Shared.Contracts;

namespace PortfolioApi.Features.Profile.UpdateProfile;

public class Endpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/profile", async (Request request, IMediator mediator, IValidator<Command> validator) =>
        {
            var command = new Command(
                request.FullName,
                request.Title,
                request.Summary,
                request.Bio,
                request.Email,
                request.Phone,
                request.WhatsAppNumber,
                request.Location,
                request.GithubUrl,
                request.LinkedInUrl,
                request.TwitterUrl,
                request.CalendlyUrl,
                request.PortfolioUrl,
                request.ProfileImageUrl,
                request.ResumePdfUrl,
                request.YearsOfExperience
            );

            var validationResult = await validator.ValidateAsync(command);
            if (!validationResult.IsValid)
            {
                return Results.ValidationProblem(validationResult.ToDictionary());
            }

            var response = await mediator.Send(command);

            if (response == null)
            {
                return Results.NotFound(new { Message = "Profile not found" });
            }

            return Results.Ok(response);
        })
        .WithName("UpdateProfile")
        .WithTags("Profile")
        .RequireAuthorization()  // Admin only
        .Produces<Response>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status404NotFound)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .Produces(StatusCodes.Status401Unauthorized);
    }
}
