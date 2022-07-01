using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Members;
using SrdDatabase.Data.Commands.Sacco.Members;
using System;
using SrdDatabase.Data.Queries.Sacco.Members;

namespace SrdDatabase.Domain.Commands.Sacco.Members
{
    public class AddMember
    {
        public class Command : MemberFields, IRequest<SaveResponse>
        {
            public Command(
                int accountNumber,
                string name,
                bool isChurch,
                DateTime dateJoined)
                : base(accountNumber, name, isChurch, dateJoined)
            {
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

                if (accountNumberResults.TotalResults > 0)
                {
                    return SaveResponse.ForError(
                        $"A member with the account number {request.AccountNumber} already exists. " +
                        "Please choose a different account number.",
                        nameof(request.AccountNumber)
                    );
                }

                var dataCommand = new SaveMember.Command(
                    null,
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
