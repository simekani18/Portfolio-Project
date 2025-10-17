using Microsoft.Extensions.Caching.Memory;

namespace PortfolioApi.Shared.Services;

public interface ITokenBlacklistService
{
    Task BlacklistTokenAsync(string token, DateTime expiration);
    Task<bool> IsTokenBlacklistedAsync(string token);
}

public class TokenBlacklistService : ITokenBlacklistService
{
    private readonly IMemoryCache _cache;
    private const string BlacklistKeyPrefix = "blacklist:";

    public TokenBlacklistService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public Task BlacklistTokenAsync(string token, DateTime expiration)
    {
        var cacheKey = $"{BlacklistKeyPrefix}{token}";
        var cacheExpiration = expiration - DateTime.UtcNow;

        if (cacheExpiration > TimeSpan.Zero)
        {
            _cache.Set(cacheKey, true, cacheExpiration);
        }

        return Task.CompletedTask;
    }

    public Task<bool> IsTokenBlacklistedAsync(string token)
    {
        var cacheKey = $"{BlacklistKeyPrefix}{token}";
        return Task.FromResult(_cache.TryGetValue(cacheKey, out _));
    }
}
