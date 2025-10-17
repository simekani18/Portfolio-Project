using FluentValidation;

namespace PortfolioApi.Features.Experiences.DeleteExperience;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Experience ID is required");
    }
}
