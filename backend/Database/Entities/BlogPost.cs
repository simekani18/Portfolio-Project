namespace PortfolioApi.Database.Entities;

public class BlogPost
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public DateOnly PublishedDate { get; set; }
    public string Thumbnail { get; set; } = string.Empty; // Emoji or image URL
    public string Summary { get; set; } = string.Empty;
    public string? Content { get; set; } // Full blog post content (optional for now)
    public string? Slug { get; set; } // URL-friendly identifier
    public bool IsPublished { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
