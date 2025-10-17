using FluentValidation;

namespace PortfolioApi.Features.Profile.UpdateProfile;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Full name is required")
            .MaximumLength(100).WithMessage("Full name must not exceed 100 characters");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(150).WithMessage("Title must not exceed 150 characters");

        RuleFor(x => x.Email)
            .EmailAddress().When(x => !string.IsNullOrEmpty(x.Email))
            .WithMessage("Invalid email format");

        RuleFor(x => x.GithubUrl)
            .Must(BeAValidUrl).When(x => !string.IsNullOrEmpty(x.GithubUrl))
            .WithMessage("Invalid GitHub URL");

        RuleFor(x => x.LinkedInUrl)
            .Must(BeAValidUrl).When(x => !string.IsNullOrEmpty(x.LinkedInUrl))
            .WithMessage("Invalid LinkedIn URL");

        RuleFor(x => x.TwitterUrl)
            .Must(BeAValidUrl).When(x => !string.IsNullOrEmpty(x.TwitterUrl))
            .WithMessage("Invalid Twitter URL");

        RuleFor(x => x.CalendlyUrl)
            .Must(BeAValidUrl).When(x => !string.IsNullOrEmpty(x.CalendlyUrl))
            .WithMessage("Invalid Calendly URL");

        RuleFor(x => x.PortfolioUrl)
            .Must(BeAValidUrl).When(x => !string.IsNullOrEmpty(x.PortfolioUrl))
            .WithMessage("Invalid Portfolio URL");

        RuleFor(x => x.YearsOfExperience)
            .GreaterThanOrEqualTo(0).When(x => x.YearsOfExperience.HasValue)
            .WithMessage("Years of experience must be non-negative");
    }

    private bool BeAValidUrl(string? url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out _);
    }
}
