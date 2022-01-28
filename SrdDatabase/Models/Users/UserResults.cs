using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Users
{
    public class UserResults : PagedResults
    {
        public IEnumerable<User> Users { get; }

        public UserResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<User> users)
            : base(pageNumber, pageSize, totalResults)
        {
            Users = users;
        }
    }
}
