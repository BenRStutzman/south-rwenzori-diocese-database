using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Members;
using SrdDatabase.Data.Commands.Sacco.Members;

namespace SrdDatabase.Domain.Commands.Sacco.Members
{
    public class AddMember
    {
        public class Command : MemberFields, IRequest<SaveResponse>
        {
            public Command(
                int accountNumber,
                string name)
                : base(accountNumber, name)
            {
            }
        }

        public class Handler : IRequestHandler<Command, SaveResponse>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<SaveResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var dataCommand = new SaveMember.Command(
                    null,
                    request.AccountNumber,
                    request.Name,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
