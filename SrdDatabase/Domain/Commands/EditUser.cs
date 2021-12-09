using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Users;
using System;

namespace SrdDatabase.Domain.Commands
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
                byte userTypeId)
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
                var dataCommand = new SaveUser.Command(
                    request.Id,
                    request.Name,
                    request.Username,
                    request.Password,
                    request.UserTypeId);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
