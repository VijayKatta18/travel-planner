using services.Entities;

namespace services.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<User> AddAsync(User user);
        Task<User?> GetByIdAsync(int id);
        Task<List<User>> GetMyUsersAsync();
        Task UpdateAsync(User existing);
        Task DeleteAsync(User existing);
    }
}
