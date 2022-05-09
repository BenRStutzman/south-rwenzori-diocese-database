using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Users;
using System;
using SrdDatabase.Data.Commands.Users;
using SrdDatabase.Data.Queries.Users;
using System.Linq;

namespace SrdDatabase.Domain.Commands.Users
{
    public class EditUser
    {
        public class Command : UserFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            [StringLength(50, MinimumLength = 8)]
            public string Password { get; }

            public Command(
                int id,
                string name,
                string username,
                string password,
                sbyte userTypeId)
                : base(userTypeId, name, username)
            {
                Id = id;
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

                if (usernameResults.Users.Any(user => user.Id != request.Id))
                {
                    return SaveResponse.ForError(
                        $"A user with the username {request.Username} already exists. " +
                        "Please choose a different username.",
                        nameof(request.Username)
                    );
                }

                var dataCommand = new SaveUser.Command(
                    request.Id,
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
