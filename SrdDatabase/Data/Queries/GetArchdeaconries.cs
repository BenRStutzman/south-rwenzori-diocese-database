using MediatR;
using SrdDatabase.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;

namespace SrdDatabase.Data.Queries
{
    public class GetArchdeaconries
    {
        public class Query : IRequest<IEnumerable<Archdeaconry>>
        {
            public int? Id { get; }

            public string Name { get; }

            public Query(int? id = null, string name = null)
            {
                Id = id;
                Name = name;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Archdeaconry>>
        {
            private readonly IDbConnection _connection;
            private readonly string _storedProcedure = "sto_get_archdeaconries";

            public Handler(IDbConnection connection)
            {
                _connection = connection;
            }

            public async Task<IEnumerable<Archdeaconry>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _connection.QueryAsync<Archdeaconry>(_storedProcedure, request, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
