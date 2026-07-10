using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ezo_assign.Models
{
    [Table("Employee_Mst")]
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [Required]
        public string EmployeeName { get; set; } = string.Empty;

        [Required]
        public int Age { get; set; }

        [Required]
        public string MobileNum { get; set; } = string.Empty;

        public string Pincode { get; set; } = string.Empty;

        public DateTime? DOB { get; set; }

        public string AddressLine1 { get; set; } = string.Empty;

        public string? AddressLine2 { get; set; }

        public int StateId { get; set; }

        public int CountryId { get; set; }

        public State? State { get; set; }

        public Country? Country { get; set; }
    }
}