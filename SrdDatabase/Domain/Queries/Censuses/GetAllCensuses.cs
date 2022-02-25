using MediatR;
using SrdDatabase.Data.Queries.Censuses;
using SrdDatabase.Models.Censuses;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Censuses
{
    public class GetAllCensuses
    {
        public class Query : IRequest<IEnumerable<Census>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Census>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Census>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetCensuses.Query(), cancellationToken);
                
                return results.Censuses;
            }
        }
    }
}
