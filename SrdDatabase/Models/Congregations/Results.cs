using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Congregations
{
    public class Results : PagedResults
    {
        public IEnumerable<Congregation> Congregations { get; }

        public Results(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Congregation> congregations)
            : base(pageNumber, pageSize, totalResults)
        {
            Congregations = congregations;
        }
    }
}
