using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Parishes;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetParishById
    {
        public class Query : IRequest<Parish>
        {
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Parish>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Parish> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetParishes.Query(id: request.Id), cancellationToken);
                return results.Parishes.Single();
            }
        }
    }
}
