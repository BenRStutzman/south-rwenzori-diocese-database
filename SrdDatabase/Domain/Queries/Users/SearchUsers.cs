using MediatR;
using SrdDatabase.Data.Queries.Users;
using SrdDatabase.Models.Users;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Users
{
    public class SearchUsers
    {
        public class Query : UserParameters, IRequest<UserResults>
        {
            public Query(
                byte? userTypeId = null,
                string name = null,
                string username = null,
                int pageNumber = 0) : base(userTypeId, name, username, pageNumber)
            {
            }
        }

        public class Handler : IRequestHandler<Query, UserResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<UserResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetUsers.Query(
                        null,
                        request.UserTypeId,
                        request.Name,
                        request.Username,
                        request.PageNumber,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
