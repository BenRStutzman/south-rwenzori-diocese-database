using MediatR;
using SrdDatabase.Data.Queries.Sacco.Transactions;
using SrdDatabase.Models.Sacco.Transactions;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Transactions
{
    public class SearchTransactions
    {
        public class Query : TransactionParameters, IRequest<TransactionResults>
        {
            public Query(
                int? memberId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int? receiptNumber = null,
                bool? isShares = null,
                bool? isContribution = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (memberId,
                    startDate,
                    endDate,
                    receiptNumber,
                    isShares,
                    isContribution,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, TransactionResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<TransactionResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetTransactions.Query(
                        null,
                        request.MemberId,
                        request.StartDate,
                        request.EndDate,
                        request.ReceiptNumber,
                        request.IsShares,
                        request.IsContribution,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
