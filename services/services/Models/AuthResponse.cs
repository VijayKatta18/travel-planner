using System.Text.Json.Serialization;

namespace services.Models
{
    public class AuthResponse
    {
        [JsonPropertyName("username")]
        public string Username { get; set; } = default!;

        [JsonPropertyName("token")]
        public string Token { get; set; } = default!;

        [JsonPropertyName("expiresAt")]
        public DateTime ExpiresAt { get; set; }
    }
}
