using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Congregations;

namespace SrdDatabase.Domain.Commands
{
    public class EditCongregation
    {
        public class Command : CongregationFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(int id, string name, int parishId)
                : base(name, parishId)
            {
                Id = id;
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
                    request.Id,
                    request.Name,
                    request.ParishId);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
