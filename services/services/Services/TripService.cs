using services.Entities;
using services.Repositories.Interfaces;
using services.Services.Interfaces;

namespace services.Services
{
    public class TripService(ITripRepository repo) : ITripService
    {
        public async Task<List<Trip>> GetMyTripsAsync(int userId)
        {
            var trips = await repo.GetByUserAsync(userId);
            return trips.Select(t => new Trip
            {
                Id = t.Id,
                Destination = t.Destination,
                StartDate = t.StartDate,
                EndDate = t.EndDate,
                Budget = t.Budget
            }).ToList();
        }

        public async Task<Trip> CreateAsync(int userId, Trip dto)
        {
            var entity = new Trip
            {
                UserId = userId,
                Destination = dto.Destination,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Budget = dto.Budget
            };
            entity = await repo.AddAsync(entity);
            return new Trip
            {
                Id = entity.Id,
                Destination = entity.Destination,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                Budget = entity.Budget
            };
        }

        public async Task UpdateAsync(int userId, Trip dto)
        {
            var existing = await repo.GetByIdAsync(dto.Id, userId);
            if (existing == null) throw new KeyNotFoundException("Trip not found.");

            existing.Destination = dto.Destination;
            existing.StartDate = dto.StartDate;
            existing.EndDate = dto.EndDate;
            existing.Budget = dto.Budget;

            await repo.UpdateAsync(existing);
        }

        public async Task DeleteAsync(int userId, int id)
        {
            var existing = await repo.GetByIdAsync(id, userId);
            if (existing == null) throw new KeyNotFoundException("Trip not found.");
            await repo.DeleteAsync(existing);
        }
    }
}
