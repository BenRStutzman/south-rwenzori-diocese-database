using MediatR;
using SrdDatabase.Data.Queries.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Distributions;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Distributions
{
    public class GetAllDistributions
    {
        public class Query : IRequest<IEnumerable<Distribution>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Distribution>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Distribution>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetDistributions.Query(), cancellationToken);
                return results.Distributions;
            }
        }
    }
}
