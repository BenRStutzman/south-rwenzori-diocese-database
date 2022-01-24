using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Transactions;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetTransactionById
    {
        public class Query : IRequest<Charge>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Charge>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Charge> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetTransactions.Query(request.Id), cancellationToken);
                
                return results.Transactions.Single();
            }
        }
    }
}
