using System.Text.Json.Serialization;

namespace services.Entities
{
    public class User
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("userId")]
        public string UserId { get; set; } = default!;

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
