using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Users;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Data.Commands.Users;
using SrdDatabase.Data.Queries.Users;

namespace SrdDatabase.Domain.Commands.Users
{
    public class AddUser
    {
        public class Command : UserFields, IRequest<SaveResponse>
        {
            [Required]
            [StringLength(50, MinimumLength = 8)]
            public string Password { get; }

            public Command(
                string name,
                string username,
                string password,
                sbyte userTypeId)
                : base(userTypeId, name, username)
            {
                Password = password;
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
                var usernameQuery = new GetUsers.Query(username: request.Username);
                var usernameResults = await _mediator.Send(usernameQuery, cancellationToken);

                if (usernameResults.TotalResults > 0)
                {
                    return SaveResponse.ForError(
                        $"A user with the username {request.Username} already exists. " +
                        "Please choose a different username.",
                        nameof(request.Username)
                    );
                }

                var dataCommand = new SaveUser.Command(
                    null,
                    request.Name,
                    request.Username,
                    request.Password,
                    request.UserTypeId,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
