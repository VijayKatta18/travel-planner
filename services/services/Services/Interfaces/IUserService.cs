using services.Entities;

namespace services.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetMyUsersAsync();
        Task<User> AddAsync(User user);
        Task UpdateAsync(int userId, User user);
        Task DeleteAsync(int id);
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string email);
    }
}
