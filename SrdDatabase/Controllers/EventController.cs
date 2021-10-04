using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SrdDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Data.Commands;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

        [HttpGet("all")]
        public async Task<IEnumerable<Event>> GetAll()
        {
            return await _mediator.Send(new GetAllEvents.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Event>> Search([FromBody] SearchEvents.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<IActionResult> Add([FromBody] SaveEvent.Command command)
        {
            var eventId = await _mediator.Send(command);

            var message = command.Id == null ? $"Event added with ID {eventId}" : "Event updated";

            return Ok(message);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] DeleteEvent.Command command)
        {
            await _mediator.Send(command);

            return Ok("Event deleted");
        }
    }
}
