using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberFields : FieldsWithUserId
    {
        [Range(1, int.MaxValue)]
        public int AccountNumber { get; }

        [Required]
        [StringLength(50)]
        public string Name { get; }

        [Required]
        public bool IsChurch { get; }

        [Required]
        public DateTime DateJoined { get; }

        public MemberFields(
            int accountNumber,
            string name,
            bool isChurch,
            DateTime dateJoined,
            int? userId = null) : base(userId)
        {
            Name = name;
            IsChurch = isChurch;
            DateJoined = dateJoined;
            AccountNumber = accountNumber;
        }
    }
}
