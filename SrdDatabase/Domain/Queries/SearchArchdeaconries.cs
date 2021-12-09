using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Archdeaconries;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchArchdeaconries
    {
        public class Query : IRequest<ArchdeaconryResults>
        {
            public ArchdeaconryParameters Parameters { get; }

            public int PageNumber { get; }

            public Query(
                ArchdeaconryParameters parameters = null,
                int pageNumber = 0)
            {
                Parameters = parameters;
                PageNumber = pageNumber;
            }
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ArchdeaconryResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetArchdeaconries.Query(
                        parameters: request.Parameters,
                        pageNumber: request.PageNumber,
                        pageSize: Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
