using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Data.Commands;
using SrdDatabase.Models.Transactions;
using System;

namespace SrdDatabase.Domain.Commands
{
    public class EditTransaction
    {
        public class Command : TransactionFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                byte transactionTypeId,
                int amount,
                int congregationId,
                string firstPersonName,
                string secondPersonName,
                DateTime date)
                : base(
                    transactionTypeId,
                    amount,
                    congregationId,
                    date)
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
                    request.TransactionTypeId,
                    request.Amount,
                    request.CongregationId,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
