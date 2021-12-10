﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System;
using SrdDatabase.Services;
using SrdDatabase.Models.Events;

namespace SrdDatabase.Data.Queries
{
    public class GetEvents
    {
        public class Query : EventParameters, IRequest<EventResults>
        {
            public int? Id { get; }

            public int PageNumber { get; }

            public int? PageSize { get; }

            public Query(
                EventParameters parameters = null,
                int? id = null,
                int pageNumber = 0,
                int? pageSize = null)
                : base(
                      parameters?.EventTypeId,
                      parameters?.ArchdeaconryId,
                      parameters?.ParishId,
                      parameters?.CongregationId,
                      parameters?.PersonName,
                      parameters?.StartDate,
                      parameters?.EndDate)
            {
                Id = id;
                PageNumber = pageNumber;
                PageSize = pageSize;
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
