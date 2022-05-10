using MediatR;
using SrdDatabase.Data.Queries.Sacco.LoanInstallments;
using SrdDatabase.Models.Sacco.LoanInstallments;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.LoanInstallments
{
    public class GetAllLoanInstallments
    {
        public class Query : IRequest<IEnumerable<LoanInstallment>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<LoanInstallment>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<LoanInstallment>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetLoanInstallments.Query(), cancellationToken);
                return results.LoanInstallments;
            }
        }
    }
}
