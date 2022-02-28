using MediatR;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Models.Quotas;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Quotas
{
    public class GetQuotaById
    {
        public class Query : IRequest<Quota>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Quota>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Quota> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetQuota.Query(request.Id), cancellationToken);
                
                return results.Quotas.Single();
            }
        }
    }
}
