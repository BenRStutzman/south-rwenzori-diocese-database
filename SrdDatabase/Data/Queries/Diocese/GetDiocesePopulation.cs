using Dapper;
using MediatR;
using SrdDatabase.Models.Shared;
using SrdDatabase.Services;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries.Dioceses
{
    public class GetDiocesePopulation
    {
        public class Query : IRequest<Population>
        {
            public Query()
            {
            }
        }

        public class Handler : IRequestHandler<Query, Population>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_diocese_population";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<Population> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();
                
                return await connection.QuerySingleAsync<Population>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
