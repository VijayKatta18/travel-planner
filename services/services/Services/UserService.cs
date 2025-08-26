using services.Entities;
using services.Repositories.Interfaces;
using services.Services.Interfaces;

namespace services.Services
{
    public class UserService(IUserRepository repo) : IUserService
    {
        public async Task<List<User>> GetMyUsersAsync()
        {
            return await repo.GetMyUsersAsync();
        }

        public async Task<User> AddAsync(User user)
        {
            return await repo.AddAsync(user);
        }

        public async Task UpdateAsync(int userId, User dto)
        {
            var existing = await repo.GetByIdAsync(dto.Id);
            if (existing == null) throw new KeyNotFoundException("User not found.");

            existing.Email = dto.Email;
            existing.UserId = dto.UserId;
            await repo.UpdateAsync(existing);
        }

        public async Task DeleteAsync(int id)
        {
            var existing = await repo.GetByIdAsync(id);
            if (existing == null) throw new KeyNotFoundException("User not found.");
            await repo.DeleteAsync(existing);
        }
    }
}
