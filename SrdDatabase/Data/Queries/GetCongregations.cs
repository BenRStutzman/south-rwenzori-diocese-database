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
    public class GetCongregations
    {
        public class Query : IRequest<IEnumerable<Congregation>>
        {
            public int? Id { get; }

            public string Name { get; }

            public int? ArchdeaconryId { get; }

            public int? ParishId { get; }

            public Query(
                int? id = null,
                string name = null,
                int? archdeaconryId = null,
                int? parishId = null)
            {
                Id = id;
                Name = name;
                ArchdeaconryId = archdeaconryId;
                ParishId = parishId;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Congregation>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_congregations";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<Congregation>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<Congregation>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
