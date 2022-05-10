﻿using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.LoanInstallments;
using System;
using SrdDatabase.Data.Commands.Sacco.LoanInstallments;

namespace SrdDatabase.Domain.Commands.Sacco.LoanInstallments
{
    public class EditLoanInstallment
    {
        public class Command : LoanInstallmentFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                int amount,
                int loanId,
                DateTime date,
                int? receiptNumber)
                : base(amount, loanId, date, receiptNumber)
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
                var dataCommand = new SaveLoanInstallment.Command(
                    request.Id,
                    request.Amount,
                    request.LoanId,
                    request.Date,
                    request.ReceiptNumber,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
