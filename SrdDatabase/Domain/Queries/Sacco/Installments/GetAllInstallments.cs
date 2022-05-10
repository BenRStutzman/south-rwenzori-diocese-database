using MediatR;
using SrdDatabase.Data.Queries.Sacco.Installments;
using SrdDatabase.Models.Sacco.Installments;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Installments
{
    public class GetAllInstallments
    {
        public class Query : IRequest<IEnumerable<Installment>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Installment>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Installment>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetInstallments.Query(), cancellationToken);
                return results.Installments;
            }
        }
    }
}
