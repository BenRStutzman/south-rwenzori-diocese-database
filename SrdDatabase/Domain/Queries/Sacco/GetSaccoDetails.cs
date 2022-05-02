using MediatR;
using SrdDatabase.Models.Sacco;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Data.Queries.Sacco.Members;

namespace SrdDatabase.Domain.Queries.Sacco
{
    public class GetSaccoDetails
    {
        public class Query : IRequest<SaccoDetails>
        {
        }

        public class Handler : IRequestHandler<Query, SaccoDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<SaccoDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var membersQuery = new GetMembers.Query(pageSize: Constants.DetailsPageSize);
                var membersTask = _mediator.Send(membersQuery, cancellationToken);

                var memberResults = await membersTask;

                return new SaccoDetails(
                    memberResults);
            }
        }
    }
}
