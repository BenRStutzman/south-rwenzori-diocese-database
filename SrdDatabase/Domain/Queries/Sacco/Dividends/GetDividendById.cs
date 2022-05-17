using MediatR;
using SrdDatabase.Data.Queries.Sacco.Dividends;
using SrdDatabase.Models.Sacco.Dividends;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Dividends
{
    public class GetDividendById
    {
        public class Query : IRequest<Dividend>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Dividend>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Dividend> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetDividends.Query(request.Id), cancellationToken);
                return results.Dividends.Single();
            }
        }
    }
}
