using MediatR;
using SrdDatabase.Models.Sacco;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Data.Queries.Sacco.Members;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Data.Queries.Sacco.Loans;
using SrdDatabase.Data.Queries.Sacco.Payments;

namespace SrdDatabase.Domain.Queries.Sacco
{
    public class GetSaccoDetails
    {
        public class Query : IRequest<SaccoDetails>
        {
        }

        public class Handler : IRequestHandler<Query, SaccoDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<SaccoDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var membersQuery = new GetMembers.Query(pageSize: Constants.DetailsPageSize);
                var membersTask = _mediator.Send(membersQuery, cancellationToken);

                var transactionsQuery = new GetTransactions.Query(pageSize: Constants.DetailsPageSize);
                var transactionsTask = _mediator.Send(transactionsQuery, cancellationToken);

                var loansQuery = new GetLoans.Query(pageSize: Constants.DetailsPageSize);
                var loansTask = _mediator.Send(loansQuery, cancellationToken);

                var paymentsQuery = new GetPayments.Query(pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var detailsQuery = new Data.Queries.Sacco.GetSaccoDetails.Query();
                var detailsTask = _mediator.Send(detailsQuery, cancellationToken);

                var memberResults = await membersTask;
                var transactionResults = await transactionsTask;
                var loanResults = await loansTask;
                var paymentResults = await paymentsTask;
                var details = await detailsTask;

                return new SaccoDetails(
                    memberResults,
                    transactionResults,
                    loanResults,
                    paymentResults,
                    details);
            }
        }
    }
}
