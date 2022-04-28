using MediatR;
using SrdDatabase.Data.Queries.Sacco.Members;
using SrdDatabase.Models.Sacco.Members;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Members
{
    public class GetAllMembers
    {
        public class Query : IRequest<IEnumerable<Member>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Member>>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<IEnumerable<Member>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _mediator.Send(new GetMembers.Query(), cancellationToken);
                return results.Members;
            }
        }
    }
}
