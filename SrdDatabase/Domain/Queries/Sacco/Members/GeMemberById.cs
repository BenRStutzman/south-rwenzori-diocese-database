using MediatR;
using SrdDatabase.Data.Queries.Sacco.Members;
using SrdDatabase.Models.Sacco.Members;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Members
{
    public class GetMemberById
    {
        public class Query : IRequest<Member>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Member>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Member> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetMembers.Query(request.Id), cancellationToken);
                return results.Members.Single();
            }
        }
    }
}
