using MediatR;
using SrdDatabase.Models.Sacco.Members;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Queries.Sacco.Members
{
    public class GetMemberDetails
    {
        public class Query : IRequest<MemberDetails>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; set; }

            public Query(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, MemberDetails>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<MemberDetails> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _mediator.Send(new GetMemberById.Query(request.Id), cancellationToken);

                return new MemberDetails(user);
            }
        }
    }
}
