using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Sacco.Dividends;
using SrdDatabase.Data.Commands.Sacco.Dividends;
using System;

namespace SrdDatabase.Domain.Commands.Sacco.Dividends
{
    public class AddDividend
    {
        public class Command : DividendFields, IRequest<SaveResponse>
        {
            public Command(
                decimal percentage,
                DateTime date)
                : base(percentage, date)
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
                var dataCommand = new SaveDividend.Command(
                    null,
                    request.Percentage,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
