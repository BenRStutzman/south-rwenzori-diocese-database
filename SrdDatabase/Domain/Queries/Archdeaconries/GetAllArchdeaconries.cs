using MediatR;
using SrdDatabase.Data.Queries.Archdeaconries;
using SrdDatabase.Models.Archdeaconries;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Archdeaconries
{
    public class GetAllArchdeaconries
    {
        public class Query : IRequest<IEnumerable<Archdeaconry>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Archdeaconry>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Archdeaconry>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetArchdeaconries.Query(), cancellationToken);
                
                return results.Archdeaconries;
            }
        }
    }
}
