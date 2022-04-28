using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberResults : PagedResults
    {
        public IEnumerable<Member> Members { get; }

        public MemberResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Member> members)
            : base(pageNumber, pageSize, totalResults)
        {
            Members = members;
        }
    }
}
