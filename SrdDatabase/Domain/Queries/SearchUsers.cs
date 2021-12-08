using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Users;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries
{
    public class SearchUsers
    {
        public class Query : IRequest<UserResults>
        {
            public UserParameters Parameters { get; }

            public int PageNumber { get; }

            public Query(UserParameters parameters, int pageNumber)
            {
                Parameters = parameters;
                PageNumber = pageNumber;
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
                        parameters: request.Parameters,
                        pageNumber: request.PageNumber,
                        pageSize: Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
