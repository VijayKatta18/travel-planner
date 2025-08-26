using System.Text.Json.Serialization;

namespace services.Entities
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

        [JsonPropertyName("nights")]
        public string? Nights { get; set; }

        [JsonPropertyName("description")]
        public string? Description { get; set; }
    }
}
