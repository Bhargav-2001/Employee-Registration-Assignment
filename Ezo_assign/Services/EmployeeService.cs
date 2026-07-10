using Ezo_assign.Models;
using Ezo_assign.Repositories;

namespace Ezo_assign.Services
{
    public class EmployeeService
    {
        private readonly EmployeeRepository _repository;

        public EmployeeService(EmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            if (await _repository.MobileExists(employee.MobileNum))
                throw new Exception(
                    "Already registered user. Please enter a new one");

            return await _repository.AddAsync(employee);
        }

        public async Task UpdateAsync(Employee employee)
        {
            await _repository.UpdateAsync(employee);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}