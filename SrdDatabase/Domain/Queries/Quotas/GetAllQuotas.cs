using MediatR;
using SrdDatabase.Data.Queries.Quotas;
using SrdDatabase.Models.Quotas;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Quotas
{
    public class GetAllQuotas
    {
        public class Query : IRequest<IEnumerable<Quota>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Quota>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Quota>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetQuota.Query(), cancellationToken);
                
                return results.Quotas;
            }
        }
    }
}
