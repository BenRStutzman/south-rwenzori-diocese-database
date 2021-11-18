using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.User;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetUserByUsername
    {
        public class Query : IRequest<User>
        {
            public string Username { get; }

            public Query(string username)
            {
                Username = username;
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _mediator.Send(new GetUsers.Query(username: request.Username), cancellationToken);
                try
                {
                    return users.Single();
                }
                catch (System.InvalidOperationException)
                {
                    // No user with the given username
                    return null;
                }
            }
        }
    }
}
