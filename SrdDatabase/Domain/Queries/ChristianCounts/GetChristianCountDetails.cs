using MediatR;
using SrdDatabase.Models.ChristianCounts;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.ChristianCounts
{
    public class GetChristianCountDetails
    {
        public class Query : IRequest<ChristianCountDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, ChristianCountDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<ChristianCountDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var christianCount = await _mediator.Send(new GetChristianCountById.Query(request.Id), cancellationToken);

                return new ChristianCountDetails(christianCount);
            }
        }
    }
}
