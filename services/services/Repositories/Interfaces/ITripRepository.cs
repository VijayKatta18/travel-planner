using services.Entities;

namespace services.Repositories.Interfaces
{
    public interface ITripRepository
    {
        Task<List<Trip>> GetByUserAsync();
        Task<Trip?> GetByIdAsync(int id);
        Task<Trip> AddAsync(Trip trip);
        Task UpdateAsync(Trip trip);
        Task DeleteAsync(Trip trip);
    }
}
