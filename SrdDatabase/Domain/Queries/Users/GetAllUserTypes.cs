using MediatR;
using SrdDatabase.Data.Queries.Users;
using SrdDatabase.Models.Users;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Users
{
    public class GetAllUserTypes
    {
        public class Query : IRequest<IEnumerable<UserType>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<UserType>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<UserType>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(new GetUserTypes.Query(), cancellationToken);
            }
        }
    }
}
