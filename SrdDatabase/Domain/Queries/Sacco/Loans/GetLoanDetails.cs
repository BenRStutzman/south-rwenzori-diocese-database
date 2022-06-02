using MediatR;
using SrdDatabase.Data.Queries.Sacco.Installments;
using SrdDatabase.Models.Sacco.Loans;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Loans
{
    public class GetLoanDetails
    {
        public class Query : IRequest<LoanDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, LoanDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<LoanDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var loanTask = _mediator.Send(new GetLoanById.Query(request.Id), cancellationToken);
                var installmentsTask = _mediator.Send(new GetInstallments.Query(loanId: request.Id), cancellationToken);

                var loan = await loanTask;
                var installmentResults = await installmentsTask;

                return new LoanDetails(loan, installmentResults);
            }
        }
    }
}
