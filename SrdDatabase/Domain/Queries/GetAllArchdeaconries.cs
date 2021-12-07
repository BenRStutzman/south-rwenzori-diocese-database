using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetAllArchdeaconries
    {
        public class Query : IRequest<ArchdeaconryResults>
        {
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ArchdeaconryResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(new GetArchdeaconries.Query(), cancellationToken);
            }
        }
    }
}
