using System.Text.Json.Serialization;

namespace services.Models
{
    public class LoginRequest
    {
        [JsonPropertyName("email")]
        public string Email { get; set; } = default!;

        [JsonPropertyName("password")]
        public string Password { get; set; } = default!;
    }
}
