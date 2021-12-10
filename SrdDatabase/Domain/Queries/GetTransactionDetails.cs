using MediatR;
using SrdDatabase.Models.Transactions;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetTransactionDetails
    {
        public class Query : IRequest<TransactionDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, TransactionDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<TransactionDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var baseTransaction = await _mediator.Send(new GetTransactionById.Query(request.Id), cancellationToken);

                return new TransactionDetails(baseTransaction);
            }
        }
    }
}
