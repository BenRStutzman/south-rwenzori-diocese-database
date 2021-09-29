using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    public class ApiController
    {
        private readonly IMediator _mediator;

        public ApiController(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task<int> GetCongregationCount()
        {
            return await _mediator.Send(new GetCongregationCount.Query());
        }

        public async Task<IEnumerable<Archdeaconry>> GetAllArchdeaconries()
        {
            return await _mediator.Send(new GetAllArchdeaconries.Query());
        }

        public async Task<IEnumerable<Parish>> GetParishesByArchdeaconryId(int id)
        {
            return await _mediator.Send(new GetParishesByArchdeaconryId.Query(id));
        }
    }
}
