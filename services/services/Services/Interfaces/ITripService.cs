using services.Entities;

namespace services.Services.Interfaces
{
    public interface ITripService
    {
        Task<List<Trip>> GetMyTripsAsync(int userId);
        Task<Trip> CreateAsync(int userId, Trip trip);
        Task UpdateAsync(int userId, Trip trip);
        Task DeleteAsync(int userId, int id);
    }
}
