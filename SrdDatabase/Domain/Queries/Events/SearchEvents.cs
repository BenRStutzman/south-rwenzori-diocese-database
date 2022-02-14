using MediatR;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Models.Events;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Events
{
    public class SearchEvents
    {
        public class Query : EventParameters, IRequest<EventResults>
        {
            public Query(
                byte? eventTypeId = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                string personName = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false,
                int? pageSize = null) : base(
                    eventTypeId,
                    archdeaconryId,
                    parishId,
                    congregationId,
                    personName,
                    startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, EventResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<EventResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetEvents.Query(
                        null,
                        request.EventTypeId,
                        request.ArchdeaconryId,
                        request.ParishId,
                        request.CongregationId,
                        request.PersonName,
                        request.StartDate,
                        request.EndDate,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
