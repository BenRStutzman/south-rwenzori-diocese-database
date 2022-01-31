using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;
using SrdDatabase.Models.Events;

namespace SrdDatabase.Data.Queries.Events
{
    public class GetEvents
    {
        public class Query : EventParameters, IRequest<EventResults>
        {
            public Query(
                int? id = null,
                byte? eventTypeId = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                string personName = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                int? pageSize = null)
                : base(
                      eventTypeId,
                      archdeaconryId,
                      parishId,
                      congregationId,
                      personName,
                      startDate,
                      endDate,
                      pageNumber,
                      pageSize,
                      id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, EventResults>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_events";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<EventResults> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                using var results = await connection.QueryMultipleAsync(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);

                var totalResults = results.ReadSingle<int>();
                var events = results.Read<Event>();

                return new EventResults(
                    request.PageNumber,
                    request.PageSize,
                    totalResults,
                    events);
            }
        }
    }
}
