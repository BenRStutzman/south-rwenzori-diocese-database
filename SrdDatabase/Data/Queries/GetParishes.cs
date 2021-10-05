using Dapper;
using MediatR;
using SrdDatabase.Models;
using SrdDatabase.Services;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Data.Queries
{
    public class GetParishes
    {
        public class Query : IRequest<IEnumerable<Parish>>
        {
            public int? Id { get; }

            public string Name { get; }

            public int? ArchdeaconryId { get; }

            public Query(int? id = null, string name = null, int? archdeaconryId = null)
            {
                Id = id;
                Name = name;
                ArchdeaconryId = archdeaconryId;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Parish>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_parishes";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<Parish>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<Parish>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
