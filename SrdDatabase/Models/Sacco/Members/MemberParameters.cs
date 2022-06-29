using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, int.MaxValue)]
        public int? AccountNumber { get; }

        [StringLength(50)]
        public string Name { get; }

        public bool? IsChurch { get; }

        public MemberParameters(
            int? accountNumber = null,
            string name = null,
            bool? isChurch = null,
            int pageNumber = 0,
            string sortColumn = null,
            bool sortDescending = false,
            int? pageSize = null,
            int? id = null) : base(
                pageNumber,
                sortColumn,
                sortDescending,
                pageSize)
        {
            Id = id;
            AccountNumber = accountNumber;
            Name = name;
            IsChurch = isChurch;
        }
    }
}
