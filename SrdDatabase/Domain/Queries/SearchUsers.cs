using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Users;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchUsers
    {
        public class Query : IRequest<IEnumerable<User>>
        {
            public byte? UserTypeId { get; }

            public string Name { get; }

            public string Username { get; }

            public Query(
                byte? userTypeId = null,
                string name = null,
                string username = null)
            {
                UserTypeId = userTypeId;
                Name = name;
                Username = username;
            }
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
                return await _mediator.Send(
                    new GetUsers.Query(
                        userTypeId: request.UserTypeId,
                        name: request.Name,
                        username: request.Username
                    ),
                    cancellationToken);
            }
        }
    }
}
