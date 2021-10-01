using MediatR;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Domain.Queries;
using SouthRwenzoriDioceseDatabase.Data.Commands;
using SouthRwenzoriDioceseDatabase.Domain.Commands;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    [Route("/api/event")]
    public class EventController : Controller
    {
        private readonly IMediator _mediator;

        public EventController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Event> GetEventById(int id)
        {
            return await _mediator.Send(new GetEventById.Query(id));
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Event>> SearchEvents([FromBody] SearchEvents.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<IActionResult> AddEvent([FromBody] SaveEvent.Command command)
        {
            var eventId = await _mediator.Send(command);

            var message = (command.Id == null) ? $"Event added with ID {eventId}" : "Event updated";

            return Ok(message);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteEvent([FromBody] DeleteEvent.Command command)
        {
            await _mediator.Send(command);

            return Ok("Event deleted");
        }
    }
}
