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
        public class Query : IRequest<IEnumerable<Transaction>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Transaction>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Transaction>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetTransactions.Query(), cancellationToken);
                
                return results.Transactions;
            }
        }
    }
}
