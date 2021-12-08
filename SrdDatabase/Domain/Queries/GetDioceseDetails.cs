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
                var archdeaconriesTask = _mediator.Send(new GetArchdeaconries.Query(), cancellationToken);
                var parishesTask = _mediator.Send(new GetParishes.Query(), cancellationToken);
                var congregationsTask = _mediator.Send(new GetCongregations.Query(), cancellationToken);
                var eventsTask = _mediator.Send(new GetEvents.Query(), cancellationToken);

                var archdeaconriesResponse = await archdeaconriesTask;
                var parishes = await parishesTask;
                var congregations = await congregationsTask;
                var events = await eventsTask;

                return new Details(
                    archdeaconriesResponse.Archdeaconries,
                    parishes,
                    congregations,
                    events);
            }
        }
    }
}
