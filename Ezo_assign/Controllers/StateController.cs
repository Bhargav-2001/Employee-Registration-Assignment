using Microsoft.EntityFrameworkCore;
using Ezo_assign.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StateController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StateController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{countryId}")]
    public async Task<IActionResult> Get(int countryId)
    {
        var states = await _context.States
            .Where(x => x.CountryId == countryId)
            .ToListAsync();

        return Ok(states);
    }
}