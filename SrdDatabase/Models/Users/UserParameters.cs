using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Users
{
    public class UserParameters : PagedParameters
    {
        [Range(1, int.MaxValue)]
        public int? Id { get; }

        [Range(1, sbyte.MaxValue)]
        public sbyte? UserTypeId { get; }

        [StringLength(50)]
        public string Name { get; }

        [StringLength(50)]
        public string Username { get; }

        public bool HideRoot { get; }


        public UserParameters(
            sbyte? userTypeId = null,
            string name = null,
            string username = null,
            bool hideRoot = false,
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
            UserTypeId = userTypeId;
            Name = name;
            Username = username;
            HideRoot = hideRoot;
        }
    }
}
