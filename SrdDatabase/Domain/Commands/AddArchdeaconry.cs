using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;

namespace SrdDatabase.Domain.Commands
{
    public class AddArchdeaconry
    {
        public class Command : IRequest<SaveResponse>
        {
            [Required]
            [StringLength(50)]
            public string Name { get; }

            public Command(string name)
            {
                Name = name;
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
                var dataCommand = new SaveArchdeaconry.Command(id: null, request.Name);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
