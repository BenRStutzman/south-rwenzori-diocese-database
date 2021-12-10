using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Congregations;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetCongregationById
    {
        public class Query : IRequest<Congregation>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Congregation>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Congregation> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetCongregations.Query(request.Id), cancellationToken);
                return results.Congregations.Single();
            }
        }
    }
}
