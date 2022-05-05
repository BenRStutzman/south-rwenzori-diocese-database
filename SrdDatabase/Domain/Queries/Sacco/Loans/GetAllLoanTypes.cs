using MediatR;
using SrdDatabase.Data.Queries.Sacco.Loans;
using SrdDatabase.Models.Sacco.Loans;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Loans
{
    public class GetAllLoanTypes
    {
        public class Query : IRequest<IEnumerable<LoanType>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<LoanType>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<LoanType>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(new GetLoanTypes.Query(), cancellationToken);
            }
        }
    }
}
