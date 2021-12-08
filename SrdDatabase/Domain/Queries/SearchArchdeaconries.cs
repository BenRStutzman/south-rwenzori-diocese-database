using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchArchdeaconries
    {
        public class Parameters
        {
            public string Name { get; }

            public Parameters(string name)
            {
                Name = name;
            }
        }

        public class Query : IRequest<ArchdeaconryResults>
        {
            public Parameters Parameters { get; }

            public int PageNumber { get; }

            public Query(Parameters parameters, int pageNumber)
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
    }
}
