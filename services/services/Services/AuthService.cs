using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;
using services.Entities;
using services.Models;
using services.Repositories.Interfaces;
using services.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace services.Services
{
    public class AuthService(IUserRepository users, IConfiguration cfg) : IAuthService
    {
        public async Task<AuthResponse> RegisterAsync(Models.RegisterRequest req)
        {
            var existing = await users.GetByUsernameAsync(req.Username);
            if (existing != null)
                throw new InvalidOperationException("Username already exists.");

            var user = new User
            {
                Username = req.Username,
                Email = req.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(req.Password)
            };
            await users.AddAsync(user);

            return GenerateToken(user, cfg);
        }

        public async Task<AuthResponse> LoginAsync(Models.LoginRequest req)
        {
            var user = await users.GetByUsernameAsync(req.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.Password))
                throw new UnauthorizedAccessException("Invalid credentials.");

            return GenerateToken(user, cfg);
        }

        private AuthResponse GenerateToken(User user, IConfiguration cfg)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cfg["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
           {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                // add roles here if needed
            };

            var expiresMinutes = int.Parse(cfg["Jwt:ExpiresMinutes"] ?? "60");

            var token = new JwtSecurityToken(
                issuer: cfg["Jwt:Issuer"],
                audience: cfg["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
                signingCredentials: creds
            );

            return new AuthResponse
            {
                Username = user.Username,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresAt = token.ValidTo
            };
        }

    }
}
