using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Parishes;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchParishes
    {
        public class Query : IRequest<ParishResults>
        {
            public ParishParameters Parameters { get; }

            public int PageNumber { get; }

            public Query(
                ParishParameters parameters = null,
                int pageNumber = 0)
            {
                Parameters = parameters;
                PageNumber = pageNumber;
            }
        }

        public class Handler : IRequestHandler<Query, ParishResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ParishResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetParishes.Query(
                        parameters: request.Parameters,
                        pageNumber: request.PageNumber,
                        pageSize: Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
