using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.User;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
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
                return await _mediator.Send(new GetUsers.Query(), cancellationToken);
            }
        }
    }
}
