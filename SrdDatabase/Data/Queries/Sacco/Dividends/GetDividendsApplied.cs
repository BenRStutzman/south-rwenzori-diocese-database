using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Dividends;

namespace SrdDatabase.Data.Queries.Sacco.Dividends
{
    public class GetDividendsApplied
    {
        public class Query : DividendAppliedParameters, IRequest<DividendAppliedResults>
        {
            public Query(
                int memberId,
                int pageNumber = 0,
                int? pageSize = null) :
                base (memberId,
                    pageNumber,
                    pageSize)
            {
            }
        }

        public class Handler : IRequestHandler<Query, DividendAppliedResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_dividends_applied";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<DividendAppliedResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var dividendsApplied = results.Read<DividendApplied>();

                return new DividendAppliedResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    dividendsApplied);
            }
        }
    }
}
