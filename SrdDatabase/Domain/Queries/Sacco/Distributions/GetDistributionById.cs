using MediatR;
using SrdDatabase.Data.Queries.Sacco.Distributions;
using SrdDatabase.Models.Sacco.Distributions;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Distributions
{
    public class GetDistributionById
    {
        public class Query : IRequest<Distribution>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Distribution>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Distribution> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetDistributions.Query(request.Id), cancellationToken);
                return results.Distributions.Single();
            }
        }
    }
}
