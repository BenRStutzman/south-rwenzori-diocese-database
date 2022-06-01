using MediatR;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands.Sacco.Distributions
{
    public class DeleteDistribution
    {
        public class Command : IRequest<DeleteResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, DeleteResponse>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<DeleteResponse> Handle(Command request, CancellationToken cancellationToken)
            {
                var dataCommand = new Data.Commands.Sacco.Distributions.DeleteDistribution.Command(
                        request.Id);

                await _mediator.Send(dataCommand, cancellationToken);

                return DeleteResponse.ForSuccess();
            }
        }
    }
}
