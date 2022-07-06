using Dapper;
using MediatR;
using SrdDatabase.Models.Shared;
using SrdDatabase.Services;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries.Parishs
{
    public class GetParishPopulation
    {
        public class Query : IRequest<Population>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Population>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_parish_population";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<Population> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();
                
                return await connection.QuerySingleAsync<Population>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
