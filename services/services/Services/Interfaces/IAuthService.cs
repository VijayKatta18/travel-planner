using Microsoft.AspNetCore.Identity.Data;
using services.Models;

namespace services.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(Models.RegisterRequest req);
        Task<AuthResponse> LoginAsync(Models.LoginRequest req);
    }
}
