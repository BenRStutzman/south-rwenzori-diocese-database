using MediatR;
using SrdDatabase.Models.Sacco.Payments;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Payments
{
    public class GetPaymentDetails
    {
        public class Query : IRequest<PaymentDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, PaymentDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<PaymentDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var payment = await _mediator.Send(new GetPaymentById.Query(request.Id), cancellationToken);

                return new PaymentDetails(payment);
            }
        }
    }
}
