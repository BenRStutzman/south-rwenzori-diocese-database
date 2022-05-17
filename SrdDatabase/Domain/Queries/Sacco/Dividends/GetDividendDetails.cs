using MediatR;
using SrdDatabase.Models.Sacco.Dividends;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Dividends
{
    public class GetDividendDetails
    {
        public class Query : IRequest<DividendDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, DividendDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DividendDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _mediator.Send(new GetDividendById.Query(request.Id), cancellationToken);

                return new DividendDetails(user);
            }
        }
    }
}
