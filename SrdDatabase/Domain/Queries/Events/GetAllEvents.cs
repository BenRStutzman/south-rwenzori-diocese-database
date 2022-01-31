using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Models.Events;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Events
{
    public class GetAllEvents
    {
        public class Query : IRequest<IEnumerable<Event>>
        {
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
                var results = await _mediator.Send(new GetEvents.Query(), cancellationToken);
                
                return results.Events;
            }
        }
    }
}
