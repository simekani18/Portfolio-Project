using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Database;
using PortfolioApi.Shared.Extensions;
using PortfolioApi.Shared.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.FullName?.Replace("+", "."));
});

builder.Services.AddMemoryCache();
builder.Services.AddSingleton<PortfolioApi.Shared.Services.ITokenBlacklistService, PortfolioApi.Shared.Services.TokenBlacklistService>();

builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddCorsPolicy();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandlingMiddleware();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseTokenBlacklist();
app.UseAuthorization();
app.UseStaticFiles();
app.MapEndpoints();

app.MapGet("/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }))
   .WithName("HealthCheck")
   .WithTags("Health");

await app.ApplyMigrationsAsync();

app.Run();
