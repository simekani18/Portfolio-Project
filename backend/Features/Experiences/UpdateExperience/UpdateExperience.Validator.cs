using FluentValidation;

namespace PortfolioApi.Features.Experiences.UpdateExperience;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Experience ID is required");

        RuleFor(x => x.Company)
            .NotEmpty().WithMessage("Company is required")
            .MaximumLength(150).WithMessage("Company must not exceed 150 characters");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(150).WithMessage("Title must not exceed 150 characters");

        RuleFor(x => x.StartDate)
            .NotEmpty().WithMessage("Start date is required");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required")
            .Must(d => d.Count > 0).WithMessage("At least one description item is required");

        RuleFor(x => x.DisplayOrder)
            .GreaterThan(0).WithMessage("Display order must be greater than 0");

        When(x => !x.IsCurrent, () =>
        {
            RuleFor(x => x.EndDate)
                .NotNull().WithMessage("End date is required when not current position")
                .GreaterThan(x => x.StartDate).WithMessage("End date must be after start date");
        });
    }
}
