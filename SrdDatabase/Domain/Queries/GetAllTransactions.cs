using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Transactions;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetAllTransactions
    {
        public class Query : IRequest<IEnumerable<Charge>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Charge>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Charge>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetPayments.Query(), cancellationToken);
                
                return results.Transactions;
            }
        }
    }
}
