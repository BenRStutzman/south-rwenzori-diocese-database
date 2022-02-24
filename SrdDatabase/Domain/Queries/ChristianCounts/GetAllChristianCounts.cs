using MediatR;
using SrdDatabase.Data.Queries.ChristianCounts;
using SrdDatabase.Models.ChristianCounts;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.ChristianCounts
{
    public class GetAllChristianCounts
    {
        public class Query : IRequest<IEnumerable<ChristianCount>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<ChristianCount>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<ChristianCount>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetChristianCounts.Query(), cancellationToken);
                
                return results.ChristianCounts;
            }
        }
    }
}
