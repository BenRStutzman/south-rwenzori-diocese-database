using MediatR;
using SrdDatabase.Models.Sacco;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Data.Queries.Sacco.Members;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Data.Queries.Sacco.Distributions;

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

                var distributionsQuery = new GetDistributions.Query(pageSize: Constants.DetailsPageSize);
                var distributionsTask = _mediator.Send(distributionsQuery, cancellationToken);

                var memberResults = await membersTask;
                var transactionResults = await transactionsTask;
                var distributionResults = await distributionsTask;

                return new SaccoDetails(
                    memberResults,
                    transactionResults,
                    distributionResults);
            }
        }
    }
}
