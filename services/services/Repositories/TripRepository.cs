using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Entities;
using services.Repositories.Interfaces;

namespace services.Repositories
{
    public class TripRepository(AppDbContext db) : ITripRepository
    {
        public Task<List<Trip>> GetByUserAsync() =>
            db.Trips.ToListAsync();

        public Task<Trip?> GetByIdAsync(int id) =>
            db.Trips.FirstOrDefaultAsync(t => t.Id == id);

        public async Task<Trip> AddAsync(Trip trip)
        {
            db.Trips.Add(trip);
            await db.SaveChangesAsync();
            return trip;
        }

        public async Task UpdateAsync(Trip trip)
        {
            db.Entry(trip).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(Trip trip)
        {
            db.Trips.Remove(trip);
            await db.SaveChangesAsync();
        }
    }
}
