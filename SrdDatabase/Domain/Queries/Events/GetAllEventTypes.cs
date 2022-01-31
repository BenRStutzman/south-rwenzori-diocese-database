using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Models.Events;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Events
{
    public class GetAllEventTypes
    {
        public class Query : IRequest<IEnumerable<EventType>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<EventType>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<EventType>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(new GetEventTypes.Query(), cancellationToken);
            }
        }
    }
}
