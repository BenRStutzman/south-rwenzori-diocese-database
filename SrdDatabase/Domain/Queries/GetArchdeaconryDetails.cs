using MediatR;
using SrdDatabase.Data.Queries;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Archdeaconries;
using Congregations = SrdDatabase.Models.Congregations;
using Events = SrdDatabase.Models.Events;

namespace SrdDatabase.Domain.Queries
{
    public class GetArchdeaconryDetails
    {
        public class Query : IRequest<ArchdeaconryDetails>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ArchdeaconryDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var archdeaconryTask = _mediator.Send(new GetArchdeaconryById.Query(request.Id), cancellationToken);
                
                var parishesTask = _mediator.Send(new GetParishes.Query(archdeaconryId: request.Id), cancellationToken);
                
                var congregationsQuery = new GetCongregations.Query(
                    new Congregations.CongregationParameters(archdeaconryId: request.Id),
                    pageSize: Constants.DetailsPageSize);

                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var eventsQuery = new GetEvents.Query(
                    new Events.EventParameters(archdeaconryId: request.Id),
                    pageSize: Constants.DetailsPageSize);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var archdeaconry = await archdeaconryTask;
                var parishes = await parishesTask;
                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;

                return new Details(
                    archdeaconry,
                    parishes,
                    congregationResults.Congregations,
                    eventResults.Events);
            }
        }
    }
}
