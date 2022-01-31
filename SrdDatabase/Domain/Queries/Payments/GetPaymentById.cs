using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Models.Payments;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Payments
{
    public class GetPaymentById
    {
        public class Query : IRequest<Payment>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Payment>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Payment> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetPayments.Query(request.Id), cancellationToken);
                
                return results.Payments.Single();
            }
        }
    }
}
