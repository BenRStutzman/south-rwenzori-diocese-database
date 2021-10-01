using Dapper;
using MediatR;
using SouthRwenzoriDioceseDatabase.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Data.Queries
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
            private readonly IDbConnection _connection;
            private readonly string _storedProcedure = "sto_get_parishes";

            public Handler(IDbConnection connection)
            {
                _connection = connection;
            }

            public async Task<IEnumerable<Parish>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _connection.QueryAsync<Parish>(_storedProcedure, request, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
