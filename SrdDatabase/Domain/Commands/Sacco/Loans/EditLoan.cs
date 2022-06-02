using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Loans;
using System;
using SrdDatabase.Data.Commands.Sacco.Loans;

namespace SrdDatabase.Domain.Commands.Sacco.Loans
{
    public class EditLoan
    {
        public class Command : LoanFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                int principal,
                int memberId,
                sbyte loanTypeId,
                DateTime dateDisbursed,
                sbyte termMonths)
                : base(principal, memberId, loanTypeId, dateDisbursed, termMonths)
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
                var dataCommand = new SaveLoan.Command(
                    request.Id,
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
