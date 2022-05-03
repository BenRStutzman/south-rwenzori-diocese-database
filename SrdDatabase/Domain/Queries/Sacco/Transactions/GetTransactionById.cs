using MediatR;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Models.Sacco.Transactions;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Transactions
{
    public class GetTransactionById
    {
        public class Query : IRequest<Transaction>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Transaction>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Transaction> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetTransactions.Query(request.Id), cancellationToken);
                return results.Transactions.Single();
            }
        }
    }
}
