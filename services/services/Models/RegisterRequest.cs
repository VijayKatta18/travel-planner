using System.Text.Json.Serialization;

namespace services.Models
{
    public class RegisterRequest
    {
        [JsonPropertyName("firstName")]
        public string? FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string? LastName { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; } = default!;

        [JsonPropertyName("password")]
        public string Password { get; set; } = default!;
    }
}
