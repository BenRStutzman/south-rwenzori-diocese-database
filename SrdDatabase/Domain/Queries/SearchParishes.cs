using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Parishes;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchParishes
    {
        public class Query : IRequest<IEnumerable<Parish>>
        {
            public string Name { get; }

            public int? ArchdeaconryId { get; }

            public Query(string name = null, int? archdeaconryId = null)
            {
                Name = name;
                ArchdeaconryId = archdeaconryId;
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Parish>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Parish>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetParishes.Query(
                        archdeaconryId: request.ArchdeaconryId,
                        name: request.Name),
                    cancellationToken);
            }
        }
    }
}
