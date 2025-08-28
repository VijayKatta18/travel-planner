using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Entities;
using services.Models;
using services.Repositories.Interfaces;

namespace services.Repositories
{
    public class UserRepository(AppDbContext db) : IUserRepository
    {
            
        public async Task<User> AddAsync(User user)
        {
            db.Users.Add(user);
            await db.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return (await db.Users.FindAsync(id))!;
        }

        public Task<List<User>> GetMyUsersAsync()
        {
            return db.Users.ToListAsync();
        }

        public async Task UpdateAsync(User existing)
        {
            db.Entry(existing).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(User existing)
        {
            db.Users.Remove(existing);
            await db.SaveChangesAsync();
        }
    }
}
