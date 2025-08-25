using services.Entities;
using System.Text.Json.Serialization;

namespace services.Models
{
    public class Trip
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("destination")]
        public string Destination { get; set; } = default!;

        [JsonPropertyName("startDate")]
        public DateTime StartDate { get; set; }

        [JsonPropertyName("endDate")]
        public DateTime EndDate { get; set; }

        [JsonPropertyName("budget")]
        public decimal Budget { get; set; }

        [JsonPropertyName("userId")]
        public int UserId { get; set; }

        [JsonPropertyName("user")]
        public User User { get; set; } = default!;
    }
}
