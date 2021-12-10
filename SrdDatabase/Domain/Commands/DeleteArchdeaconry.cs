using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Parishes;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands
{
    public class DeleteArchdeaconry
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
                var parishesQuery = new GetParishes.Query(archdeaconryId: request.Id);
                var parishResults = await _mediator.Send(parishesQuery, cancellationToken);

                if (parishResults.TotalResults > 0)
                {
                    return DeleteResponse.ForError(
                        "Unable to delete this archdeaconry because it has parishes associated with it. " +
                        "Please delete all of those parishes or move them to another archdeaconry, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.DeleteArchdeaconry.Command(request.Id),
                    cancellationToken);

                return DeleteResponse.ForSuccess();
            }
        }
    }
}
