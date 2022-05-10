using MediatR;
using SrdDatabase.Data.Queries.Sacco.LoanInstallments;
using SrdDatabase.Models.Sacco.LoanInstallments;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.LoanInstallments
{
    public class SearchLoanInstallments
    {
        public class Query : LoanInstallmentParameters, IRequest<LoanInstallmentResults>
        {
            public Query(
                int? memberId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int? receiptNumber = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (memberId,
                    startDate,
                    endDate,
                    receiptNumber,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, LoanInstallmentResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<LoanInstallmentResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetLoanInstallments.Query(
                        null,
                        request.MemberId,
                        request.StartDate,
                        request.EndDate,
                        request.ReceiptNumber,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
