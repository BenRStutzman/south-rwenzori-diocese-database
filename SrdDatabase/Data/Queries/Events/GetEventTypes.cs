using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using SrdDatabase.Services;
using SrdDatabase.Models.Events;

namespace SrdDatabase.Data.Queries.Events
{
    public class GetEventTypes
    {
        public class Query : IRequest<IEnumerable<EventType>>
        {
            public Query()
            {
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<EventType>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_event_types";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<EventType>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<EventType>(
                    _storedProcedure,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
