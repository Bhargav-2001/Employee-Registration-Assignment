using Ezo_assign.Models;
using Ezo_assign.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ezo_assign.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _service;

        public EmployeeController(EmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var emp = await _service.GetByIdAsync(id);

            if (emp == null)
                return NotFound();

            return Ok(emp);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            var result = await _service.AddAsync(employee);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            Employee employee)
        {
            employee.EmployeeId = id;
            await _service.UpdateAsync(employee);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok();
        }
    }
}