using Dapper;
using MediatR;
using SouthRwenzoriDioceseDatabase.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Data.Queries
{
    public class GetParishesByArchdeaconryId
    {
        public class Query : IRequest<IEnumerable<Parish>>
        {
            public int ArchdeaconryId { get; }

            public Query(int archdeaconryId)
            {
                ArchdeaconryId = archdeaconryId;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Parish>>
        {
            private readonly IDbConnection _connection;
            private readonly string _storedProcedure = "sto_get_parishes_by_archdeaconry_id";

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
