using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Transactions;
using System;
using SrdDatabase.Data.Commands.Sacco.Transactions;

namespace SrdDatabase.Domain.Commands.Sacco.Transactions
{
    public class EditTransaction
    {
        public class Command : TransactionFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                int amount,
                int memberId,
                DateTime date,
                bool isShares,
                bool isContribution,
                int? receiptNumber)
                : base(amount, memberId, date, isShares, isContribution, receiptNumber)
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
                var dataCommand = new SaveTransaction.Command(
                    request.Id,
                    request.Amount,
                    request.MemberId,
                    request.Date,
                    request.IsShares,
                    request.IsContribution,
                    request.ReceiptNumber,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
