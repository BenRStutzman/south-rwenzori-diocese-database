using Dapper;
using MediatR;
using SrdDatabase.Services;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries.Reports
{
    public class GetDioceseBalance
    {
        public class Query : IRequest<int>
        {
            public DateTime Date { get; }

            public bool IncludeTransactionsOnDate { get; }

            public Query(
                DateTime date,
                bool includeTransactionsOnDate = true
                )
            {
                Date = date;
                IncludeTransactionsOnDate = includeTransactionsOnDate;
            }
        }

        public class Handler : IRequestHandler<Query, int>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_diocese_balance";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QuerySingleAsync<int>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
