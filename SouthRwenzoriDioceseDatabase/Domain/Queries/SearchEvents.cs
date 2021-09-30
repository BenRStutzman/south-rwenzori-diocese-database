using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
{
    public class SearchEvents
    {
        public class Query : IRequest<IEnumerable<Event>>
        {
            public byte? EventTypeId { get; }

            public int? ArchdeaconryId { get; }

            public int? ParishId { get; }

            public int? CongregationId { get; }

            public string PersonName { get; }

            public DateTime? StartDate { get; }

            public DateTime? EndDate { get; }

            public Query(
                byte? eventTypeId = null,
                int? archdeaconryId = null,
                int? parishId = null,
                int? congregationId = null,
                string personName = null,
                DateTime? startDate = null,
                DateTime? endDate = null)
            {
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
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Event>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetEvents.Query(
                        eventTypeId: request.EventTypeId,
                        archdeaconryId: request.ArchdeaconryId,
                        parishId: request.ParishId,
                        congregationId: request.CongregationId,
                        personName: request.PersonName,
                        startDate: request.StartDate,
                        endDate: request.EndDate),
                    cancellationToken);
            }
        }
    }
}
