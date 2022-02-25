using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;
using SrdDatabase.Models.Censuses;

namespace SrdDatabase.Data.Queries.Censuses
{
    public class GetCensuses
    {
        public class Query : CensusParameters, IRequest<CensusResults>
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

        public class Handler : IRequestHandler<Query, CensusResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_censuses";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<CensusResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var censuses = results.Read<Census>();

                return new CensusResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    censuses);
            }
        }
    }
}
