using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetDioceseDetails
    {
        public class Query : IRequest<DioceseDetails>
        {
        }

        public class Handler : IRequestHandler<Query, DioceseDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DioceseDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var archdeaconriesTask = _mediator.Send(new GetArchdeaconries.Query(), cancellationToken);
                var parishesTask = _mediator.Send(new GetParishes.Query(), cancellationToken);
                var congregationsTask = _mediator.Send(new GetCongregations.Query(), cancellationToken);
                var eventsTask = _mediator.Send(new GetEvents.Query(), cancellationToken);

                var archdeaconriesResponse = await archdeaconriesTask;
                var parishes = await parishesTask;
                var congregations = await congregationsTask;
                var events = await eventsTask;

                return new DioceseDetails(
                    archdeaconriesResponse.Archdeaconries,
                    parishes,
                    congregations,
                    events);
            }
        }
    }
}
