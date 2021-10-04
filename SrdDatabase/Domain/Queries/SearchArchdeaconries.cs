using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchArchdeaconries
    {
        public class Query : IRequest<IEnumerable<Archdeaconry>>
        {
            public string Name { get; }

            public Query(string name = null)
            {
                Name = name;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Archdeaconry>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Archdeaconry>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetArchdeaconries.Query(name: request.Name),
                    cancellationToken);
            }
        }
    }
}
