namespace PortfolioApi.Database.Entities;

public class Project
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Emoji { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Features { get; set; } = Array.Empty<string>();
    public string Stack { get; set; } = string.Empty; // Comma-separated technologies
    public string? DemoUrl { get; set; }
    public string? DetailsUrl { get; set; }
    public int DisplayOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
