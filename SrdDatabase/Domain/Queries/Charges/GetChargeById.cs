using MediatR;
using SrdDatabase.Data.Queries.Charges;
using SrdDatabase.Models.Charges;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Charges
{
    public class GetChargeById
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
                var results = await _mediator.Send(new GetCharges.Query(request.Id), cancellationToken);
                
                return results.Charges.Single();
            }
        }
    }
}
