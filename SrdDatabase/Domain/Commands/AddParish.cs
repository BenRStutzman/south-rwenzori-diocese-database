using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Parishes;

namespace SrdDatabase.Domain.Commands
{
    public class AddParish
    {
        public class Command : ParishFields, IRequest<SaveResponse>
        {
            public Command(string name, int archdeaconryId)
                : base(name, archdeaconryId)
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
                var dataCommand = new SaveParish.Command(
                    null,
                    request.Name,
                    request.ArchdeaconryId);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
