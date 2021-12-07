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
            public string Name { get; }

            public int PageNumber { get; }

            public Query(
                string name = null,
                int pageNumber = 0)
            {
                Name = name;
                PageNumber = pageNumber;
            }
        }

        public class Handler : IRequestHandler<Query, ArchdeaconryResults>
        {
            private readonly IMediator _mediator;

            private readonly int _pageSize = 20;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ArchdeaconryResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetArchdeaconries.Query(
                        name: request.Name,
                        pageNumber: request.PageNumber,
                        pageSize: _pageSize),
                    cancellationToken);
            }
        }
    }
}
