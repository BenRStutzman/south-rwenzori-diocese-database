using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Users;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Domain.Commands
{
    public class AddUser
    {
        public class Command : UserFields, IRequest<SaveResponse>
        {
            [Required]
            [StringLength(50)]
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
                    request.UserTypeId);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
