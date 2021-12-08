using MediatR;
using SrdDatabase.Data.Queries;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Archdeaconries;

namespace SrdDatabase.Domain.Queries
{
    public class GetArchdeaconryDetails
    {
        public class Query : IRequest<Details>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
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
                var archdeaconryTask = _mediator.Send(new GetArchdeaconryById.Query(request.Id), cancellationToken);
                var parishesTask = _mediator.Send(new GetParishes.Query(archdeaconryId: request.Id), cancellationToken);
                var congregationsTask = _mediator.Send(new GetCongregations.Query(archdeaconryId: request.Id), cancellationToken);
                var eventsTask = _mediator.Send(new GetEvents.Query(archdeaconryId: request.Id), cancellationToken);

                var archdeaconry = await archdeaconryTask;
                var parishes = await parishesTask;
                var congregations = await congregationsTask;
                var events = await eventsTask;

                return new Details(
                    archdeaconry,
                    parishes,
                    congregations,
                    events);
            }
        }
    }
}
