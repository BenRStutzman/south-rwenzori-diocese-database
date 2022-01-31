using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Data.Queries.Users;
using SrdDatabase.Models.Users;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Users
{
    public class GetAllUsers
    {
        public class Query : IRequest<IEnumerable<User>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<User>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetUsers.Query(), cancellationToken);
                return results.Users;
            }
        }
    }
}
