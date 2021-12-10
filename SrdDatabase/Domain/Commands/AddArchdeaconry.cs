using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Archdeaconries;

namespace SrdDatabase.Domain.Commands
{
    public class AddArchdeaconry
    {
        public class Command : ArchdeaconryFields, IRequest<SaveResponse>
        {
            public Command(string name) : base(name)
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
                var dataCommand = new SaveArchdeaconry.Command(
                    null,
                    request.Name,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
