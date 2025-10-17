using System.Text.Json.Serialization;

namespace PortfolioApi.Features.Auth.TokenIntrospection;

public record Response(
    [property: JsonPropertyName("active")] bool Active,
    [property: JsonPropertyName("username")] string? Username,
    [property: JsonPropertyName("exp")] long? Exp,
    [property: JsonPropertyName("iat")] long? Iat,
    [property: JsonPropertyName("sub")] string? Sub
);
