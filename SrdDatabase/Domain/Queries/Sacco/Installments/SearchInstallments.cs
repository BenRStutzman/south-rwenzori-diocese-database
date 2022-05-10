using MediatR;
using SrdDatabase.Data.Queries.Sacco.Installments;
using SrdDatabase.Models.Sacco.Installments;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Installments
{
    public class SearchInstallments
    {
        public class Query : InstallmentParameters, IRequest<InstallmentResults>
        {
            public Query(
                int? loanId = null,
                int? memberId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int? receiptNumber = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (loanId,
                    memberId,
                    startDate,
                    endDate,
                    receiptNumber,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, InstallmentResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<InstallmentResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetInstallments.Query(
                        null,
                        request.LoanId,
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
