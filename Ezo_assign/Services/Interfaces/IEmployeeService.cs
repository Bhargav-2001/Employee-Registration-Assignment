using Ezo_assign.DTOs;
using Ezo_assign.Models;

namespace Ezo_assign.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee?> CreateAsync(EmployeeDto dto);
        Task<Employee?> UpdateAsync(int id, EmployeeDto dto);
        Task<bool> DeleteAsync(int id);
    }
}