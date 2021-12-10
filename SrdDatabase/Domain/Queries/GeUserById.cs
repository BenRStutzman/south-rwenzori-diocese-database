using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Users;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetUserById
    {
        public class Query : IRequest<User>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
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
                var results = await _mediator.Send(new GetUsers.Query(request.Id), cancellationToken);
                return results.Users.Single();
            }
        }
    }
}
