using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Data.Queries.Payments;
using SrdDatabase.Models.Payments;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Payments
{
    public class GetAllPayments
    {
        public class Query : IRequest<IEnumerable<Payment>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Payment>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Payment>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetPayments.Query(), cancellationToken);
                
                return results.Payments;
            }
        }
    }
}
