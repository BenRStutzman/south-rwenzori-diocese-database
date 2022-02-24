using MediatR;
using SrdDatabase.Data.Queries.Congregations;
using SrdDatabase.Data.Queries.Events;
using SrdDatabase.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands.Parishes
{
    public class DeleteParish
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
                var congregationsQuery = new GetCongregations.Query(parishId: request.Id);
                var congregationsTask = _mediator.Send(congregationsQuery, cancellationToken);

                var eventsQuery = new GetEvents.Query(parishId: request.Id);
                var eventsTask = _mediator.Send(eventsQuery, cancellationToken);

                var congregationResults = await congregationsTask;
                var eventResults = await eventsTask;

                var associatedItems = congregationResults.TotalResults > 0 ? "congregations"
                    : eventResults.TotalResults > 0 ? "events" : null;

                if (!string.IsNullOrEmpty(associatedItems))
                {
                    return DeleteResponse.ForError(
                        $"Unable to delete this parish because it has {associatedItems} associated with it. " +
                        $"Please delete all of those {associatedItems} or move them to another parish, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.Parishes.DeleteParish.Command(request.Id), cancellationToken);

                return DeleteResponse.ForSuccess();
            }
        }
    }
}
