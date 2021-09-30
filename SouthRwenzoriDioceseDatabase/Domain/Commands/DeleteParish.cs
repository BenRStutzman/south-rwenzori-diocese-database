using MediatR;
using SouthRwenzoriDioceseDatabase.Domain.Queries;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SouthRwenzoriDioceseDatabase.Domain.Commands
{
    public class DeleteParish
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
                var congregations = await _mediator.Send(
                    new SearchCongregations.Query(parishId: request.Id), cancellationToken);

                if (congregations.Any())
                {
                    return Response.ForError(@"
                        Unable to delete this parish because it has congregations associated with it.
                        Please delete all of those congregations or move them to another parish,
                        then try again.
                    ");
                }

                await _mediator.Send(
                    new Data.Commands.DeleteParish.Command(request.Id), cancellationToken);

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
