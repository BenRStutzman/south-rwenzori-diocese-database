using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
{
    public class GetEventById
    {
        public class Query : IRequest<Event>
        {
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Event>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Event> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _mediator.Send(new GetEvents.Query(request.Id), cancellationToken);
                return events.Single();
            }
        }
    }
}
