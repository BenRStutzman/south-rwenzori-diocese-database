using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetParishDetails
    {
        public class Query : IRequest<ParishDetails>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, ParishDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ParishDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var parishesTask = _mediator.Send(new GetParishes.Query(request.Id), cancellationToken);
                var congregationsTask = _mediator.Send(new GetCongregations.Query(parishId: request.Id), cancellationToken);
                var eventsTask = _mediator.Send(new GetEvents.Query(parishId: request.Id), cancellationToken);

                var parish = (await parishesTask).Single();
                var congregations = await congregationsTask;
                var events = await eventsTask;

                return new ParishDetails(
                    parish,
                    congregations,
                    events);
            }
        }
    }
}
