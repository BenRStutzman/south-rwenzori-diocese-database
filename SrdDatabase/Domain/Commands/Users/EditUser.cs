﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Users;
using System;
using SrdDatabase.Data.Commands.Users;

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
