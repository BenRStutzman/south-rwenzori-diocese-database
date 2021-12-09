using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Congregations
{
    public class CongregationFields
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int ParishId { get; }

        public CongregationFields(string name, int parishId)
        {
            Name = name;
            ParishId = parishId;
        }
    }
}
