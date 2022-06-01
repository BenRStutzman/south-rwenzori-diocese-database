using MediatR;
using SrdDatabase.Models.Sacco.Distributions;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Distributions
{
    public class GetDistributionDetails
    {
        public class Query : IRequest<DistributionDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, DistributionDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DistributionDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _mediator.Send(new GetDistributionById.Query(request.Id), cancellationToken);

                return new DistributionDetails(user);
            }
        }
    }
}
