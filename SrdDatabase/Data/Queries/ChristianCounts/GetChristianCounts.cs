using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;
using SrdDatabase.Models.ChristianCounts;

namespace SrdDatabase.Data.Queries.ChristianCounts
{
    public class GetChristianCounts
    {
        public class Query : ChristianCountParameters, IRequest<ChristianCountResults>
        {
            public Query(
                int? id = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null)
                : base(
                      archdeaconryId,
                      parishId,
                      congregationId,
                      startDate,
                      endDate,
                      pageNumber,
                      sortColumn,
                      sortDescending,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ChristianCountResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_christian_counts";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<ChristianCountResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var christianCounts = results.Read<ChristianCount>();

                return new ChristianCountResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    christianCounts);
            }
        }
    }
}
