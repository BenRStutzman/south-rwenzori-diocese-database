using MediatR;
using SrdDatabase.Data.Queries.Charges;
using SrdDatabase.Models.Charges;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Charges
{
    public class GetAllCharges
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
                var results = await _mediator.Send(new GetCharges.Query(), cancellationToken);
                
                return results.Charges;
            }
        }
    }
}
