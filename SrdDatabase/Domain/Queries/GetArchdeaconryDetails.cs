using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
                var archdeaconriesTask = _mediator.Send(new GetArchdeaconries.Query(request.Id), cancellationToken);
                var parishesTask = _mediator.Send(new GetParishes.Query(archdeaconryId: request.Id), cancellationToken);
                var congregationsTask = _mediator.Send(new GetCongregations.Query(archdeaconryId: request.Id), cancellationToken);
                var eventsTask = _mediator.Send(new GetEvents.Query(archdeaconryId: request.Id), cancellationToken);

                var archdeaconry = (await archdeaconriesTask).Single();
                var parishes = await parishesTask;
                var congregations = await congregationsTask;
                var events = await eventsTask;

                return new ArchdeaconryDetails(
                    archdeaconry,
                    parishes,
                    congregations,
                    events);
            }
        }
    }
}
