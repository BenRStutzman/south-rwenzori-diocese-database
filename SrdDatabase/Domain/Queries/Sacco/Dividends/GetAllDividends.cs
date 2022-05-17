using MediatR;
using SrdDatabase.Data.Queries.Sacco.Dividends;
using SrdDatabase.Models.Sacco.Dividends;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Dividends
{
    public class GetAllDividends
    {
        public class Query : IRequest<IEnumerable<Dividend>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Dividend>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Dividend>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetDividends.Query(), cancellationToken);
                return results.Dividends;
            }
        }
    }
}
