﻿using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Archdeaconries
{
    public class Results : PagedResults
    {
        public IEnumerable<Archdeaconry> Archdeaconries { get; }

        public Results(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Archdeaconry> archdeaconries)
            : base(pageNumber, pageSize, totalResults)
        {
            Archdeaconries = archdeaconries;
        }
    }
}
