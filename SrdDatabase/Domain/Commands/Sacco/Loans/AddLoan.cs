using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Loans;
using SrdDatabase.Data.Commands.Sacco.Loans;
using System;

namespace SrdDatabase.Domain.Commands.Sacco.Loans
{
    public class AddLoan
    {
        public class Command : LoanFields, IRequest<SaveResponse>
        {
            public Command(
                int principal,
                int memberId,
                sbyte loanTypeId,
                DateTime dateDisbursed,
                sbyte termMonths)
                : base(principal, memberId, loanTypeId, dateDisbursed, termMonths)
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
                var dataCommand = new SaveLoan.Command(
                    null,
                    request.Principal,
                    request.MemberId,
                    request.DateDisbursed,
                    request.LoanTypeId,
                    request.TermMonths,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
