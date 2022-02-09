using System.Collections.Generic;

namespace SrdDatabase.Models.Shared
{
    public class MultiSaveResponse
    {
        public IEnumerable<int> Ids { get; }

        public MultiSaveResponse(IEnumerable<int> ids)
        {
            Ids = ids;
        }
    }
}
