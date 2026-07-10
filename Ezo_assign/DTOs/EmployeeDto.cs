namespace Ezo_assign.DTOs
{
    public class EmployeeDto
    {
        public string EmployeeName { get; set; }

        public int Age { get; set; }

        public string MobileNum { get; set; }

        public string Pincode { get; set; }

        public DateTime? DOB { get; set; }

        public string AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        public int StateId { get; set; }

        public int CountryId { get; set; }
    }
}