using MediatR;
using SrdDatabase.Data.Queries.Sacco.Loans;
using SrdDatabase.Models.Sacco.Loans;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Loans
{
    public class SearchLoans
    {
        public class Query : LoanParameters, IRequest<LoanResults>
        {
            public Query(
                int? memberId = null,
                sbyte? loanTypeId = null,
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (memberId,
                    loanTypeId,
                    startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, LoanResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<LoanResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetLoans.Query(
                        null,
                        request.MemberId,
                        request.LoanTypeId,
                        request.StartDate,
                        request.EndDate,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
