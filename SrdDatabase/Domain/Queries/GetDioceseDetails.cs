using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Diocese;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetDioceseDetails
    {
        public class Query : IRequest<Details>
        {
        }

        public class Handler : IRequestHandler<Query, Details>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Details> Handle(Query request, CancellationToken cancellationToken)
            {
                var archdeaconriesQuery = new GetArchdeaconries.Query(pageSize: Constants.DetailsPageSize);
                var archdeaconriesTask = _mediator.Send(archdeaconriesQuery, cancellationToken);
                
                var parishesTask = _mediator.Send(new GetParishes.Query(), cancellationToken);
                
                var congregationsQuery = new GetCongregations.Query(pageSize: Constants.DetailsPageSize);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);
                
                var eventsTask = _mediator.Send(new GetEvents.Query(), cancellationToken);

                var archdeaconryResults = await archdeaconriesTask;
                var parishes = await parishesTask;
                var congregationResults = await congregationsTask;
                var events = await eventsTask;

                return new Details(
                    archdeaconryResults.Archdeaconries,
                    parishes,
                    congregationResults.Congregations,
                    events);
            }
        }
    }
}
