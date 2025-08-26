using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using services.Entities;
using services.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // protect all trip routes
    public class TripsController(ITripService trips) : ControllerBase
    {
        private int CurrentUserId =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ??
                      User.FindFirstValue(JwtRegisteredClaimNames.Sub)!);

        [HttpGet]
        public async Task<ActionResult<List<Trip>>> GetMine()
        {
            var res = await trips.GetMyTripsAsync();
            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<Trip>> Create(Trip dto)
        {
            var res = await trips.CreateAsync(dto);
            return CreatedAtAction(nameof(GetMine), new { id = res.Id }, res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Trip dto)
        {
            if (id != dto.Id) return BadRequest("ID mismatch.");
            await trips.UpdateAsync(dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await trips.DeleteAsync(id);
            return NoContent();
        }

    }
}
