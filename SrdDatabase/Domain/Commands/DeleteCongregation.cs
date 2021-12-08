using MediatR;
using SrdDatabase.Data.Queries;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Models.Events;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands
{
    public class DeleteCongregation
    {
        public class Command : IRequest<Response>
        {
            public int Id { get; }

            public Command(int id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var eventsQuery = new GetEvents.Query(
                    new EventParameters(congregationId: request.Id));
                var eventResults = await _mediator.Send(eventsQuery, cancellationToken);

                if (eventResults.TotalResults > 0)
                {
                    return Response.ForError(
                        "Unable to delete this congregation because it has events associated with it. " +
                        "Please delete all of those events or move them to another congregation, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.DeleteCongregation.Command(request.Id), cancellationToken);

                return Response.ForSuccess();
            }
        }

        public class Response
        {
            public bool Succeeded { get; }

            public string ErrorMessage { get; }

            private Response(bool succeeded = true, string errorMessage = null)
            {
                Succeeded = succeeded;
                ErrorMessage = errorMessage;
            }

            public static Response ForSuccess() => new();

            public static Response ForError(string errorMessage) => new(false, errorMessage);
        }
    }
}
