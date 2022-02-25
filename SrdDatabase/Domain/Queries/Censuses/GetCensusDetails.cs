using MediatR;
using SrdDatabase.Models.Censuses;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Censuses
{
    public class GetCensusDetails
    {
        public class Query : IRequest<CensusDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, CensusDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<CensusDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var census = await _mediator.Send(new GetCensusById.Query(request.Id), cancellationToken);

                return new CensusDetails(census);
            }
        }
    }
}
