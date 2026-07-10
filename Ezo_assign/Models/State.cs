using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ezo_assign.Models
{
    [Table("State_Mst")]
    public class State
    {
        [Key]
        public int StateId { get; set; }

        public string StateName { get; set; } = string.Empty;

        public int CountryId { get; set; }

        public Country? Country { get; set; }
    }
}