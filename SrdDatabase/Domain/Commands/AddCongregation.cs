using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Congregations;

namespace SrdDatabase.Domain.Commands
{
    public class AddCongregation
    {
        public class Command : CongregationFields, IRequest<SaveResponse>
        {
            public Command(string name, int parishId)
                : base(name, parishId)
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
                var dataCommand = new SaveCongregation.Command(
                    null,
                    request.Name,
                    request.ParishId);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
