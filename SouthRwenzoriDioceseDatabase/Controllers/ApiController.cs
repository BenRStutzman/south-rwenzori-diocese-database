using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Data.Commands;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    public class ApiController
    {
        private readonly IMediator _mediator;

        public ApiController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET requests

        public async Task<IEnumerable<Archdeaconry>> GetArchdeaconries([FromBody] GetArchdeaconries.Query query)
        {
            return await _mediator.Send(query);
        }

        public async Task<IEnumerable<Parish>> GetParishes([FromBody] GetParishes.Query query)
        {
            return await _mediator.Send(query);
        }

        public async Task<IEnumerable<Congregation>> GetCongregations([FromBody] GetCongregations.Query query)
        {
            return await _mediator.Send(query);
        }

        public async Task<IEnumerable<Event>> GetEvents([FromBody] GetEvents.Query query)
        {
            return await _mediator.Send(query);
        }

        // POST requests

        public async Task<int> AddEvent([FromBody] AddEvent.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}
