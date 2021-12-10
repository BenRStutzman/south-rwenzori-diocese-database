using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Attributes;
using SrdDatabase.Domain.Commands;
using SrdDatabase.Models.Events;
using SrdDatabase.Models.Users;
using SrdDatabase.Models.Shared;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class EventController : BaseController
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
            return await _mediator.Send(new GetAllEventTypes.Query());
        }

        [HttpPost("search")]
        public async Task<EventResults> Search(SearchEvents.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("add")]
        public async Task<SaveResponse> Add(AddEvent.Command command)
        {
            command.SetUserId(CurrentUser.Id);
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Contributor)]
        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditEvent.Command command)
        {
            // Only allow contributors to edit events they created
            if (CurrentUser.UserType == UserRole.Contributor)
            {
                var eventObject = await _mediator.Send(new GetEventById.Query(command.Id));

                if (eventObject.CreatedBy != CurrentUser.Id)
                {
                    return Unauthorized("You can only edit events that you created.");
                }
            }

            command.SetUserId(CurrentUser.Id);
            return Ok(await _mediator.Send(command));
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
