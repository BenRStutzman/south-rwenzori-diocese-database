using MediatR;
using SrdDatabase.Models.Archdeaconries;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;

namespace SrdDatabase.Data.Queries.Archdeaconries
{
    public class GetArchdeaconries
    {
        public class Query : ArchdeaconryParameters, IRequest<ArchdeaconryResults>
        {
            public Query(
                int? id = null,
                string name = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base(
                    name,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_archdeaconries";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<ArchdeaconryResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var archdeaconries = results.Read<Archdeaconry>();

                return new ArchdeaconryResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    archdeaconries);
            }
        }
    }
}
