using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Queries
{
    public class GetAllParishes
    {
        public class Query : IRequest<IEnumerable<Parish>>
        {
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
                return await _mediator.Send(new GetParishes.Query(), cancellationToken);
            }
        }
    }
}
