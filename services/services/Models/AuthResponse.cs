using System.Text.Json.Serialization;

namespace services.Models
{
    public class AuthResponse
    {
        [JsonPropertyName("userId")]
        public string UserId { get; set; } = default!;

        [JsonPropertyName("token")]
        public string Token { get; set; } = default!;

        [JsonPropertyName("expiresAt")]
        public DateTime ExpiresAt { get; set; }
    }
}
