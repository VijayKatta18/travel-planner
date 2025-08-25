using services.Entities;

namespace services.Repositories.Interfaces
{
    public interface ITripRepository
    {
        Task<List<Trip>> GetByUserAsync(int userId);
        Task<Trip?> GetByIdAsync(int id, int userId);
        Task<Trip> AddAsync(Trip trip);
        Task UpdateAsync(Trip trip);
        Task DeleteAsync(Trip trip);
    }
}
