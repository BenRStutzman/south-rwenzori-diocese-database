using MediatR;
using SrdDatabase.Models.Quotas;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Quotas
{
    public class GetQuotaDetails
    {
        public class Query : IRequest<QuotaDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, QuotaDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<QuotaDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var quota = await _mediator.Send(new GetQuotaById.Query(request.Id), cancellationToken);

                return new QuotaDetails(quota);
            }
        }
    }
}
