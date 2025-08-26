using services.Entities;

namespace services.Services.Interfaces
{
    public interface ITripService
    {
        Task<List<Trip>> GetMyTripsAsync();
        Task<Trip> CreateAsync(Trip trip);
        Task UpdateAsync(Trip trip);
        Task DeleteAsync(int id);
    }
}
