using MediatR;
using SrdDatabase.Data.Queries.Sacco.Loans;
using SrdDatabase.Models.Sacco.Loans;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Loans
{
    public class GetAllLoans
    {
        public class Query : IRequest<IEnumerable<Loan>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Loan>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Loan>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetLoans.Query(), cancellationToken);
                return results.Loans;
            }
        }
    }
}
