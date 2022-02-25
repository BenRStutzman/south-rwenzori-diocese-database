using MediatR;
using SrdDatabase.Data.Queries.Censuses;
using SrdDatabase.Models.Censuses;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Censuses
{
    public class GetCensusById
    {
        public class Query : IRequest<Census>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Census>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Census> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetCensuses.Query(request.Id), cancellationToken);
                
                return results.Censuses.Single();
            }
        }
    }
}
