using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Users;
using System;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Data.Commands.Users;

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
                byte userTypeId)
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
