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
            var existing = await users.GetMyUsersAsync();
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
            await users.AddAsync(user);

            return GenerateToken(user, cfg);
        }

        private string GenerateUserId(Models.RegisterRequest req, List<User> existing)
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


        public async Task<AuthResponse> LoginAsync(Models.LoginRequest req)
        {
            var user = await users.GetMyUsersAsync();
            var loggedUser = user.Where(u => u.Email == req.Email).FirstOrDefault();
            if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, loggedUser.Password))
                throw new UnauthorizedAccessException("Invalid credentials.");

            return GenerateToken(loggedUser, cfg);
        }

        private AuthResponse GenerateToken(User user, IConfiguration cfg)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(cfg["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
           {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserId),
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
                UserId = user.UserId,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresAt = token.ValidTo
            };
        }

    }
}
