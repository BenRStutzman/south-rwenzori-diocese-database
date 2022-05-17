using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Sacco.Dividends;
using System;

namespace SrdDatabase.Data.Queries.Sacco.Dividends
{
    public class GetDividends
    {
        public class Query : DividendParameters, IRequest<DividendResults>
        {
            public Query(
                int? id = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) :
                base (startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    pageSize,
                    id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, DividendResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_sacco_dividends";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<DividendResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var dividends = results.Read<Dividend>();

                return new DividendResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    dividends);
            }
        }
    }
}
