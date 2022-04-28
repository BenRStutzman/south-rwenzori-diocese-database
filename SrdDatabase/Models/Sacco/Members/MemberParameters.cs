using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [StringLength(50)]
        public string Name { get; }


        public MemberParameters(
            string name = null,
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
            Name = name;
        }
    }
}
