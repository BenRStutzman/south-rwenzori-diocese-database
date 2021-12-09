using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Users;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetUserByUsername
    {
        public class Query : IRequest<User>
        {
            [Required]
            [StringLength(50)]
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
                var query = new GetUsers.Query(
                    new UserParameters(username: request.Username));
                var results = await _mediator.Send(query, cancellationToken);
                
                try
                {
                    return results.Users.Single(user => user.Username == request.Username);
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
