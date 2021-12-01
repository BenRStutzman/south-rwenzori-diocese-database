using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SrdDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Data.Commands;
using SrdDatabase.Data.Queries;
using SrdDatabase.Attributes;
using SrdDatabase.Domain.Commands;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class EventController : Controller
    {
        private readonly IMediator _mediator;

        public EventController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Event> GetById(int id)
        {
            return await _mediator.Send(new GetEventById.Query(id));
        }


        [HttpGet("details/{id}")]
        public async Task<EventDetails> Details(int id)
        {
            return await _mediator.Send(new GetEventDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Event>> GetAll()
        {
            return await _mediator.Send(new GetAllEvents.Query());
        }

        [HttpGet("types")]
        public async Task<IEnumerable<EventType>> GetTypes()
        {
            return await _mediator.Send(new GetEventTypes.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Event>> Search(SearchEvents.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("add")]
        public async Task<int> Add(AddEvent.Command command)
        {
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("save")]
        public async Task<int> Edit(EditEvent.Command command)
        {
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteEvent.Command command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
