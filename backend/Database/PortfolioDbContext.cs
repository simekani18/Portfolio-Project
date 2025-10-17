using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database.Entities;

namespace PortfolioApi.Database;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
    {
    }

    public DbSet<Profile> Profiles { get; set; }
    public DbSet<AdminUser> AdminUsers { get; set; }
    public DbSet<Experience> Experiences { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<BlogPost> BlogPosts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasDefaultSchema("portfolio");

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.ToTable("profiles");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Summary).HasMaxLength(500);
            entity.Property(e => e.Bio).HasColumnType("text");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.WhatsAppNumber).HasMaxLength(20);
            entity.Property(e => e.Location).HasMaxLength(100);
            entity.Property(e => e.GithubUrl).HasMaxLength(200);
            entity.Property(e => e.LinkedInUrl).HasMaxLength(200);
            entity.Property(e => e.TwitterUrl).HasMaxLength(200);
            entity.Property(e => e.CalendlyUrl).HasMaxLength(200);
            entity.Property(e => e.PortfolioUrl).HasMaxLength(200);
            entity.Property(e => e.ProfileImageUrl).HasMaxLength(500);
            entity.Property(e => e.ResumePdfUrl).HasMaxLength(500);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.ToTable("admin_users");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Username).IsUnique();
            entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
            entity.Property(e => e.PasswordHash).IsRequired().HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.ToTable("experiences");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Company).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Location).HasMaxLength(100);
            entity.Property(e => e.StartDate).IsRequired();
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Technologies).IsRequired();
            entity.Property(e => e.DisplayOrder).IsRequired();
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => e.DisplayOrder);
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.ToTable("skills");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Level).IsRequired();
            entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            entity.Property(e => e.DisplayOrder).IsRequired();
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => e.DisplayOrder);
            entity.HasIndex(e => e.Category);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.ToTable("projects");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Emoji).HasMaxLength(10);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired().HasColumnType("text");
            entity.Property(e => e.Features).IsRequired();
            entity.Property(e => e.Stack).IsRequired().HasMaxLength(500);
            entity.Property(e => e.DemoUrl).HasMaxLength(500);
            entity.Property(e => e.DetailsUrl).HasMaxLength(500);
            entity.Property(e => e.DisplayOrder).IsRequired();
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => e.DisplayOrder);
        });

        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.ToTable("blog_posts");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.PublishedDate).IsRequired();
            entity.Property(e => e.Thumbnail).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Summary).IsRequired().HasColumnType("text");
            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.Slug).HasMaxLength(250);
            entity.Property(e => e.IsPublished).HasDefaultValue(true);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.PublishedDate);
        });

        modelBuilder.Entity<AdminUser>().HasData(
            new AdminUser
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                CreatedAt = DateTime.UtcNow
            }
        );

        modelBuilder.Entity<Profile>().HasData(
            new Profile
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                FullName = "Simekani Mabambe",
                Title = "Software Engineer",
                Summary = "Creating clean, visually stunning, and functional solutions",
                Bio = "Creating clean, visually stunning, and functional solutions for all your needs.",
                Email = "simekani.mabambi@gmail.com",
                Phone = "+27 82 955 4784",
                WhatsAppNumber = "+27829554784",
                Location = "South Africa",
                GithubUrl = "https://github.com/simekani",
                LinkedInUrl = "https://www.linkedin.com/in/simekani",
                CalendlyUrl = "https://calendly.com/simekani-mabambi",
                YearsOfExperience = 3,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        );

        modelBuilder.Entity<Experience>().HasData(
            new Experience
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000011"),
                Company = "Direct Transact, South Africa",
                Title = "Software Engineer",
                Location = "South Africa",
                StartDate = new DateOnly(2024, 1, 1),
                EndDate = null,
                IsCurrent = true,
                Description = new[]
                {
                    "Designed and developed a PCI-compliant tokenization system securing sensitive payment data",
                    "Led implementation of microservices architecture using Kubernetes and Kafka for scalable backend infrastructure",
                    "Developed using C#, .NET Core, PostgreSQL, and AWS cloud services (EC2, RDS, Aurora)",
                    "Automated deployment pipelines and collaborated with cross-functional teams to maintain high code quality"
                },
                Technologies = new[] { "C#", ".NET Core", "PostgreSQL", "AWS", "Kubernetes", "Kafka" },
                DisplayOrder = 1,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Experience
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000012"),
                Company = "DVT, South Africa",
                Title = "iOS Developer (Contracted to ABSA Bank)",
                Location = "South Africa",
                StartDate = new DateOnly(2022, 1, 1),
                EndDate = new DateOnly(2023, 12, 31),
                IsCurrent = false,
                Description = new[]
                {
                    "Solo iOS developer for ABSA's short-term insurance division, independently building and maintaining feature-rich iOS apps",
                    "Advocated and implemented SOLID principles, led code reviews, and ensured adherence to Apple's Human Interface Guidelines",
                    "Actively participated in Agile ceremonies, sprint planning, and feature releases",
                    "Delivered seamless user experiences aligned with business requirements and compliance standards",
                    "KEY ACHIEVEMENT: Successfully delivered critical short-term insurance app features as sole iOS developer"
                },
                Technologies = new[] { "Swift", "UIKit", "iOS", "Agile" },
                DisplayOrder = 2,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Experience
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000013"),
                Company = "DVT, South Africa",
                Title = "Graduate iOS Developer",
                Location = "South Africa",
                StartDate = new DateOnly(2021, 1, 1),
                EndDate = new DateOnly(2021, 12, 31),
                IsCurrent = false,
                Description = new[]
                {
                    "Integrated third-party APIs and built user-friendly interfaces consistent with Apple's HIG standards",
                    "Demonstrated quick adaptability to new tools and frameworks, contributing to team projects with efficient solutions",
                    "Collaborated with senior developers to deliver high-quality mobile applications"
                },
                Technologies = new[] { "Swift", "iOS", "UIKit" },
                DisplayOrder = 3,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        );
    }
}
