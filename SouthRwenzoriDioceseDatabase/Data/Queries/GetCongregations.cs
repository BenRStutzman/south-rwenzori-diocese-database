using Dapper;
using MediatR;
using SouthRwenzoriDioceseDatabase.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Data.Queries
{
    public class GetCongregations
    {
        public class Query : IRequest<IEnumerable<Congregation>>
        {
            public int? Id { get; }

            public int? ArchdeaconryId { get; }

            public int? ParishId { get; }

            public Query(int? id = null, int? archdeaconryId = null, int? parishId = null)
            {
                Id = id;
                ArchdeaconryId = archdeaconryId;
                ParishId = parishId;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Congregation>>
        {
            private readonly IDbConnection _connection;
            private readonly string _storedProcedure = "sto_get_congregations";

            public Handler(IDbConnection connection)
            {
                _connection = connection;
            }

            public async Task<IEnumerable<Congregation>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _connection.QueryAsync<Congregation>(_storedProcedure, request, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
