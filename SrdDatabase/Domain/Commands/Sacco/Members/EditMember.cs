using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Members;
using System;
using SrdDatabase.Data.Commands.Sacco.Members;
using SrdDatabase.Data.Queries.Sacco.Members;
using System.Linq;

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
                DateTime dateJoined,
                string name,
                bool isChurch)
                : base(accountNumber, name, isChurch, dateJoined)
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
                var accountNumberQuery = new GetMembers.Query(accountNumber: request.AccountNumber);
                var accountNumberResults = await _mediator.Send(accountNumberQuery, cancellationToken);

                if (accountNumberResults.Members.Any(member => member.Id != request.Id))
                {
                    return SaveResponse.ForError(
                        $"A member with the account number {request.AccountNumber} already exists. " +
                        "Please choose a different account number.",
                        nameof(request.AccountNumber)
                    );
                }

                var dataCommand = new SaveMember.Command(
                    request.Id,
                    request.AccountNumber,
                    request.Name,
                    request.IsChurch,
                    request.DateJoined,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
