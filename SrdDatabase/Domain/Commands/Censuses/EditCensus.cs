using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using SrdDatabase.Models.Shared;
using SrdDatabase.Models.Censuses;
using System;
using SrdDatabase.Data.Commands.Censuses;

namespace SrdDatabase.Domain.Commands.Censuses
{
    public class EditCensus
    {
        public class Command : CensusFields, IRequest<SaveResponse>
        {
            [Range(1, int.MaxValue)]
            public int Id { get; }

            public Command(
                int id,
                 int males0To12,
                int females0To12,
                int males13To17,
                int females13To17,
                int males18To35,
                int females18To35,
                int males36AndAbove,
                int females36AndAbove,
                int congregationId,
                DateTime date)
                : base(
                    males0To12,
                    females0To12,
                    males13To17,
                    females13To17,
                    males18To35,
                    females18To35,
                    males36AndAbove,
                    females36AndAbove,
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
                var dataCommand = new SaveCensus.Command(
                    request.Id,
                    request.Males0To12,
                    request.Females0To12,
                    request.Males13To17,
                    request.Females13To17,
                    request.Males18To35,
                    request.Females18To35,
                    request.Males36AndAbove,
                    request.Females36AndAbove,
                    request.CongregationId,
                    request.Date,
                    request.UserId.Value);

                return await _mediator.Send(dataCommand, cancellationToken);
            }
        }
    }
}
