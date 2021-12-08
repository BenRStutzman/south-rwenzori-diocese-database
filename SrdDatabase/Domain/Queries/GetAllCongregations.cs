using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Congregations;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetAllCongregations
    {
        public class Query : IRequest<IEnumerable<Congregation>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Congregation>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Congregation>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(new GetCongregations.Query(), cancellationToken);
            }
        }
    }
}
