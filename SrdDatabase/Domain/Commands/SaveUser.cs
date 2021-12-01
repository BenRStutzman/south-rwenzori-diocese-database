using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System;

namespace SrdDatabase.Domain.Commands
{
    public class SaveUser
    {
        public class Command : IRequest<int>
        {
            public int? Id { get; }

            [Required]
            [StringLength(50)]
            public string Name { get; }

            [Required]
            [StringLength(50)]
            public string Username { get; }

            [StringLength(50)]
            public string Password { get; }

            [Required]
            public byte UserTypeId { get; }

            public Command(
                int? id,
                string name,
                string username,
                string password,
                byte userTypeId)
            {
                Id = id;
                Name = name;
                Username = username;
                Password= password;
                UserTypeId = userTypeId;
            }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly IMediator _mediator;

            public Handler(IMediator mediator)
            {
                _mediator = mediator;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Id == null & string.IsNullOrEmpty(request.Password))
                {
                    throw new ArgumentException("You must set a password.");
                }

                var setPassword = !string.IsNullOrEmpty(request.Password);

                var dataCommand = new Data.Commands.SaveUser.Command(
                    request.Id,
                    request.Name,
                    request.Username,
                    setPassword ? BCrypt.Net.BCrypt.HashPassword(request.Password) : "",
                    request.UserTypeId,
                    setPassword);

                return await _mediator.Send(dataCommand);
            }
        }
    }
}
