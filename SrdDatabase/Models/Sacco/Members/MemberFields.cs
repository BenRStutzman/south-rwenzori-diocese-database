using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberFields : SaveFields
    {
        [Required]
        [StringLength(50)]
        public string Name { get; }

        [Range(1, int.MaxValue)]
        public int AccountNumber { get; }

        public MemberFields(
            int accountNumber,
            string name,
            int? userId = null) : base(userId)
        {
            Name = name;
            AccountNumber = accountNumber;
        }
    }
}
