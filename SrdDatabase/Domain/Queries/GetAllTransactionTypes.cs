using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Transactions;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetAllTransactionTypes
    {
        public class Query : IRequest<IEnumerable<TransactionType>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<TransactionType>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<TransactionType>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(new GetTransactionTypes.Query(), cancellationToken);
            }
        }
    }
}
