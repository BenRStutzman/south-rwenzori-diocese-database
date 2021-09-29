using Dapper;
using MediatR;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Data.Queries
{
    public class GetCongregationCount
    {
        public class Query : IRequest<int>
        {
        }

        public class Handler : IRequestHandler<Query, int>
        {
            private readonly IDbConnection _connection;
            private readonly string _storedProcedure = "sto_get_congregation_count";

            public Handler(IDbConnection connection)
            {
                _connection = connection;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _connection.QuerySingleAsync<int>(_storedProcedure, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
