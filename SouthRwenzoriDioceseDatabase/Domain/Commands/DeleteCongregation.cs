using MediatR;
using SouthRwenzoriDioceseDatabase.Domain.Queries;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Commands
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
                var events = await _mediator.Send(
                    new SearchEvents.Query(congregationId: request.Id), cancellationToken);

                if (events.Any())
                {
                    return Response.ForError(@"
                        Unable to delete this congregation because it has events associated with it.
                        Please delete all of those events or move them to another congregation,
                        then try again.
                    ");
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
