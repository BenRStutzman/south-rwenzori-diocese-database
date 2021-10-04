using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
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
                return await _mediator.Send(new GetEvents.Query(), cancellationToken);
            }
        }
    }
}
