using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using services.Entities;
using services.Services.Interfaces;

namespace services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // protect all trip routes
    public class UsersController(IUserService user) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetMine()
        {
            var res = await user.GetMyUsersAsync();
            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create(User dto)
        {
            var res = await user.AddAsync(dto);
            return CreatedAtAction(nameof(GetMine), new { id = res.Id }, res);
        }

    }
}
