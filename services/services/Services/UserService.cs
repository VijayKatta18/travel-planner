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

        public async Task<User> AddAsync(User req)
        {
            var existing = await repo.GetMyUsersAsync();
            if (existing.Any() && existing.Any(u => u.Email == req.Email))
                throw new InvalidOperationException("Username already exists.");

            string userId = string.Empty;
            userId = GenerateUserId(req, existing);

            var user = new User
            {
                FirstName = req.FirstName,
                LastName = req.LastName,
                Email = req.Email,
                UserId = userId,
                Password = BCrypt.Net.BCrypt.HashPassword(req.Password)
            };
            return await repo.AddAsync(user);
        }

        public async Task UpdateAsync(int userId, User dto)
        {
            var existing = await repo.GetByIdAsync(dto.Id);
            if (existing == null) throw new KeyNotFoundException("User not found.");
            existing.FirstName = dto.FirstName;
            existing.LastName = dto.LastName;
            existing.Email = dto.Email;
            existing.Password = dto.Password;
            await repo.UpdateAsync(existing);
        }

        public async Task DeleteAsync(int id)
        {
            var existing = await repo.GetByIdAsync(id);
            if (existing == null) throw new KeyNotFoundException("User not found.");
            await repo.DeleteAsync(existing);
        }

        private string GenerateUserId(User req, List<User> existing)
        {
            if (string.IsNullOrWhiteSpace(req.FirstName) || string.IsNullOrWhiteSpace(req.LastName))
                throw new ArgumentException("First name and last name are required");

            var baseUserId = $"{req.FirstName.ToLower()}_{req.LastName[0].ToString().ToLower()}";

            if (!existing.Any(u => u.UserId.Equals(baseUserId, StringComparison.OrdinalIgnoreCase)))
                return baseUserId;

            int counter = 1;
            string newUserId;
            do
            {
                newUserId = $"{baseUserId}{counter}";
                counter++;
            }
            while (existing.Any(u => u.UserId.Equals(newUserId, StringComparison.OrdinalIgnoreCase)));

            return newUserId;
        }

        public async Task<User> GetUserById(int id)
        {
            return await repo.GetByIdAsync(id);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await repo.GetUserByEmail(email);
        }
    }
}
