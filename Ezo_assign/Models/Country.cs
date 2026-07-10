using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ezo_assign.Models
{
    [Table("Country_Mst")]
    public class Country
    {
        [Key]
        public int CountryId { get; set; }

        public string CountryName { get; set; } = string.Empty;
    }
}