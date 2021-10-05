using MediatR;
using SrdDatabase.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;

namespace SrdDatabase.Data.Queries
{
    public class GetEvents
    {
        public class Query : IRequest<IEnumerable<Event>>
        {
            public int? Id { get; }

            public byte? EventTypeId { get; }

            public int? ArchdeaconryId { get; }

            public int? ParishId { get; }

            public int? CongregationId { get; }

            public string PersonName { get; }

            public DateTime? StartDate { get; }

            public DateTime? EndDate { get; }

            public Query(
                int? id = null,
                byte? eventTypeId = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                string personName = null,
                DateTime? startDate = null,
                DateTime? endDate = null)
            {
                Id = id;
                EventTypeId = eventTypeId;
                ArchdeaconryId = archdeaconryId;
                ParishId = parishId;
                CongregationId = congregationId;
                PersonName = personName;
                StartDate = startDate;
                EndDate = endDate;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Event>>
        {
            private readonly IDbService _dbService;
            private readonly string _storedProcedure = "sto_get_events";

            public Handler(IDbService dbService)
            {
                _dbService = dbService;
            }

            public async Task<IEnumerable<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                using var connection = _dbService.GetConnection();

                return await connection.QueryAsync<Event>(
                    _storedProcedure,
                    request,
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
