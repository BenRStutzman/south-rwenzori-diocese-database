using MediatR;
using SrdDatabase.Data.Queries.Sacco.Dividends;
using SrdDatabase.Models.Sacco.Dividends;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Dividends
{
    public class SearchDividends
    {
        public class Query : DividendParameters, IRequest<DividendResults>
        {
            public Query(
                DateTime? startDate = null,
                DateTime? endDate = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (startDate,
                    endDate,
                    pageNumber,
                    sortColumn,
                    sortDescending)
            {
            }
        }

        public class Handler : IRequestHandler<Query, DividendResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DividendResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetDividends.Query(
                        null,
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
