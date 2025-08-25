using Microsoft.EntityFrameworkCore;
using services.Data;
using services.Entities;
using services.Repositories.Interfaces;

namespace services.Repositories
{
    public class UserRepository(AppDbContext db) : IUserRepository
    {
        public Task<User?> GetByUsernameAsync(string username) =>
            db.Users.FirstOrDefaultAsync(u => u.Username == username);
            
        public async Task<User> AddAsync(User user)
        {
            db.Users.Add(user);
            await db.SaveChangesAsync();
            return user;
        }

        public Task<User?> GetByIdAsync(int id) => db.Users.FindAsync(id).AsTask();
    }
}
