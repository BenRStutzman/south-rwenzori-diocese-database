using MediatR;
using SrdDatabase.Models.Charges;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Charges
{
    public class GetChargeDetails
    {
        public class Query : IRequest<ChargeDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, ChargeDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ChargeDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var charge = await _mediator.Send(new GetChargeById.Query(request.Id), cancellationToken);

                return new ChargeDetails(charge);
            }
        }
    }
}
