using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Members;
using System;
using SrdDatabase.Data.Commands.Sacco.Members;

namespace SrdDatabase.Domain.Commands.Sacco.Members
{
    public class EditMember
    {
        public class Command : MemberFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                int accountNumber,
                string name)
                : base(accountNumber, name)
            {
                Id = id;
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
                var dataCommand = new SaveMember.Command(
                    request.Id,
                    request.AccountNumber,
                    request.Name,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
