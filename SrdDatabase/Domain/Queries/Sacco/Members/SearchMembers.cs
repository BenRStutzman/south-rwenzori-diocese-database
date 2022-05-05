using MediatR;
using SrdDatabase.Data.Queries.Sacco.Members;
using SrdDatabase.Models.Sacco.Members;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Members
{
    public class SearchMembers
    {
        public class Query : MemberParameters, IRequest<MemberResults>
        {
            public Query(
                int? id = null,
                string name = null,
                int pageNumber = 0,
                string sortColumn = null,
                bool sortDescending = false) : base
                    (name,
                    pageNumber,
                    sortColumn,
                    sortDescending,
                    id: id)
            {
            }
        }

        public class Handler : IRequestHandler<Query, MemberResults>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<MemberResults> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _mediator.Send(
                    new GetMembers.Query(
                        request.Id,
                        request.Name,
                        request.PageNumber,
                        request.SortColumn,
                        request.SortDescending,
                        Constants.SearchPageSize),
                    cancellationToken);
            }
        }
    }
}
