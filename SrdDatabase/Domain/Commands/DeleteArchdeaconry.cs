using MediatR;
using SrdDatabase.Domain.Queries;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SrdDatabase.Domain.Commands
{
    public class DeleteArchdeaconry
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
                var parishes = await _mediator.Send(
                    new SearchCongregations.Query(archdeaconryId: request.Id), cancellationToken);

                if (parishes.Any())
                {
                    return Response.ForError(
                        "Unable to delete this archdeaconry because it has parishes associated with it. " +
                        "Please delete all of those parishes or move them to another archdeaconry, " +
                        "then try again."
                    );
                }

                await _mediator.Send(
                    new Data.Commands.DeleteArchdeaconry.Command(request.Id), cancellationToken);

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
