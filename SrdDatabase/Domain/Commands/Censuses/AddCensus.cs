using MediatR;
using System.Threading;
using System.Threading.Tasks;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Censuses;
using System;
using SrdDatabase.Data.Commands.Censuses;

namespace SrdDatabase.Domain.Commands.Censuses
{
    public class AddCensus
    {
        public class Command : CensusFields, IRequest<SaveResponse>
        {
            public Command(
                int numberOfChristians,
                int congregationId,
                DateTime date)
                : base(
                    numberOfChristians,
                    congregationId,
                    date)
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
                var dataCommand = new SaveCensus.Command(
                    null,
                    request.NumberOfChristians,
                    request.CongregationId,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
