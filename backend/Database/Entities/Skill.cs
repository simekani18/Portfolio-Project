namespace PortfolioApi.Database.Entities;

public class Skill
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public int Level { get; set; } // 0-100 percentage
    public string Category { get; set; } = string.Empty; // Languages, Frameworks, Databases, Cloud, DevOps
    public int DisplayOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
