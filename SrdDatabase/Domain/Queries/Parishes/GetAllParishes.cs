using MediatR;
using SrdDatabase.Data.Queries.Parishes;
using SrdDatabase.Models.Parishes;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Parishes
{
    public class GetAllParishes
    {
        public class Query : IRequest<IEnumerable<Parish>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Parish>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Parish>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetParishes.Query(), cancellationToken);
                return results.Parishes;
            }
        }
    }
}
