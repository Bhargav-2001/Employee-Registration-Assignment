using Ezo_assign.Models;

namespace Ezo_assign.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee> AddAsync(Employee employee);
        Task<Employee?> UpdateAsync(Employee employee);
        Task<bool> DeleteAsync(int id);
        Task<bool> MobileExists(string mobile, int employeeId = 0);
    }
}