using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database;

namespace PortfolioApi.Shared.Extensions;

public static class DatabaseExtensions
{
    public static async Task ApplyMigrationsAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<PortfolioDbContext>>();

        try
        {
            logger.LogInformation("Checking database connection...");
            await context.Database.EnsureCreatedAsync();
            logger.LogInformation("Database initialized successfully");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initializing the database");
            throw;
        }
    }
}
