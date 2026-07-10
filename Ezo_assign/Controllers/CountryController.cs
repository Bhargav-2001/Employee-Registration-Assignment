using Microsoft.EntityFrameworkCore;
using Ezo_assign.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CountryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CountryController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _context.Countries.ToListAsync());
    }
}