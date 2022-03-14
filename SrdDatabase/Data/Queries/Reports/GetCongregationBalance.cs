using Dapper;
using MediatR;
using SrdDatabase.Services;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries.Congregations
{
    public class GetCongregationBalance
    {
        public class Query : IRequest<int>
        {
            public int Id { get; }

            public DateTime Date { get; }

            public bool IncludeCurrentDateQuota { get; }

            public Query(
                int id,
                DateTime date,
                bool includeCurrentDateQuota = true
                )
            {
                Id = id;
                Date = date;
                IncludeCurrentDateQuota = includeCurrentDateQuota;
            }
        }

        public class Handler : IRequestHandler<Query, int>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_congregation_balance";

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
