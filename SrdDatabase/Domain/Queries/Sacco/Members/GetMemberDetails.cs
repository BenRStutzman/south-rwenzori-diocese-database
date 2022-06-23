using MediatR;
using SrdDatabase.Data.Queries.Sacco.Distributions;
using SrdDatabase.Data.Queries.Sacco.Installments;
using SrdDatabase.Data.Queries.Sacco.Loans;
using SrdDatabase.Data.Queries.Sacco.Payments;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Models.Sacco.Members;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Members
{
    public class GetMemberDetails
    {
        public class Query : IRequest<MemberDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, MemberDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<MemberDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var memberTask = _mediator.Send(new GetMemberById.Query(request.Id), cancellationToken);

                var transactionsQuery = new GetTransactions.Query(
                    memberId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var transactionsTask = _mediator.Send(transactionsQuery, cancellationToken);

                var distributionsAppliedQuery = new GetDistributionsApplied.Query(
                    memberId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var distributionsAppliedTask = _mediator.Send(distributionsAppliedQuery, cancellationToken);

                var loansQuery = new GetLoans.Query(
                    memberId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var loansTask = _mediator.Send(loansQuery, cancellationToken);
                
                var paymentsQuery = new GetPayments.Query(
                    memberId: request.Id,
                    pageSize: Constants.DetailsPageSize);
                var paymentsTask = _mediator.Send(paymentsQuery, cancellationToken);

                var member = await memberTask;
                var transactionResults = await transactionsTask;
                var distributionAppliedResults = await distributionsAppliedTask;
                var loanResults = await loansTask;
                var paymentResults = await paymentsTask;

                return new MemberDetails(
                    member,
                    transactionResults,
                    distributionAppliedResults,
                    loanResults,
                    paymentResults);
            }
        }
    }
}
