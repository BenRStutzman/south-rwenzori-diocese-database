using MediatR;
using SouthRwenzoriDioceseDatabase.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;

namespace SouthRwenzoriDioceseDatabase.Data.Queries
{
    public class GetEvents
    {
        public class Query : IRequest<IEnumerable<Event>>
        {
            public byte? EventTypeId { get; }

            public int? CongregationId { get; }

            public string PersonName { get; }

            public DateTime? StartDate { get; }

            public DateTime? EndDate { get; }

            public Query(
                byte? eventTypeId = null,
                int? congregationId = null,
                string personName = null,
                DateTime? startDate = null,
                DateTime? endDate = null)
            {
                EventTypeId = eventTypeId;
                CongregationId = congregationId;
                PersonName = personName;
                StartDate = startDate;
                EndDate = endDate;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Event>>
        {
            private readonly IDbConnection _connection;
            private readonly string _storedProcedure = "sto_get_events";

            public Handler(IDbConnection connection)
            {
                _connection = connection;
            }

            public async Task<IEnumerable<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _connection.QueryAsync<Event>(_storedProcedure, request, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
