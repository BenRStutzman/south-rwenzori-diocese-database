using MediatR;
using SrdDatabase.Models.Users;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class GetUserDetails
    {
        public class Query : IRequest<UserDetails>
        {
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, UserDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<UserDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _mediator.Send(new GetUserById.Query(request.Id), cancellationToken);

                return new UserDetails(user);
            }
        }
    }
}
