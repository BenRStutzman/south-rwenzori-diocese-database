using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands
{
    public class DeleteCongregation
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
                var eventsQuery = new GetEvents.Query(congregationId: request.Id);
                var eventResults = await _mediator.Send(eventsQuery, cancellationToken);

                if (eventResults.TotalResults > 0)
                {
                    return DeleteResponse.ForError(
                        "Unable to delete this congregation because it has events associated with it. " +
                        "Please delete all of those events or move them to another congregation, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.DeleteCongregation.Command(request.Id), cancellationToken);

                return DeleteResponse.ForSuccess();
            }
        }
    }
}
