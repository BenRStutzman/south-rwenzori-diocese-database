using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchArchdeaconries
    {
        public class Query : IRequest<ArchdeaconryResults>
        {
            public SearchParameters Parameters { get; }

            public int PageNumber { get; }

            public Query(SearchParameters parameters, int pageNumber)
            {
                Parameters = parameters;
                PageNumber = pageNumber;
            }
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryResults>
        {
            private readonly IMediator _mediator;

            private readonly int _pageSize = 3;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ArchdeaconryResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetArchdeaconries.Query(
                        name: request.Parameters.Name,
                        pageNumber: request.PageNumber,
                        pageSize: _pageSize),
                    cancellationToken);
            }

        }
        public class SearchParameters
        {
            public string Name { get; }

            public SearchParameters(string name)
            {
                Name = name;
            }
        }
    }
}
