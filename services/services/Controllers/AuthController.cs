using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using services.Entities;
using services.Models;
using services.Services;
using services.Services.Interfaces;

namespace services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService auth, IUserService userService) : ControllerBase
    {

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] string idToken)
        {
            try
            {
                // Validate Google token
                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
                if (payload == null) return Unauthorized();

                // Check if user exists, otherwise create
                var user = await userService.GetUserByEmail(payload.Email);

                if (user == null)
                {
                    user = new User
                    {
                        UserId = "test",
                        Email = payload.Email,
                        FirstName = payload.Name,
                        LastName = "test",
                        Password = Guid.NewGuid().ToString(),
                    };

                    user = await userService.AddAsync(user);
                }

                // Issue your own JWT
                var res = auth.GenerateJwt(user);

                return Ok(new { token = res.Token, userId = user.UserId });
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterRequest req)
        {
            try
            {
                var res = await auth.RegisterAsync(req);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest req)
        {
            try
            {
                var res = await auth.LoginAsync(req);
                return Ok(res);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
