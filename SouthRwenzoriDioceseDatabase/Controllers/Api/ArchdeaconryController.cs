using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Domain.Queries;
using SouthRwenzoriDioceseDatabase.Data.Commands;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    [Route("/api/archdeaconry")]
    public class ArchdeaconryController : Controller
    {
        private readonly IMediator _mediator;

        public ArchdeaconryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Archdeaconry> GetArchdeaconryById(int id)
        {
            return await _mediator.Send(new GetArchdeaconryById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Archdeaconry>> GetAllArchdeaconries()
        {
            return await _mediator.Send(new GetAllArchdeaconries.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Archdeaconry>> SearchArchdeaconries([FromBody] SearchArchdeaconries.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<IActionResult> AddArchdeaconry([FromBody] SaveArchdeaconry.Command command)
        {
            var archdeaconryId = await _mediator.Send(command);

            var message = command.Id == null
                ? $"Archdeaconry added with ID {archdeaconryId}"
                : "Archdeaconry updated";

            return Ok(message);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteArchdeaconry([FromBody] Domain.Commands.DeleteArchdeaconry.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok("Archdeaconry deleted") : BadRequest(response.ErrorMessage);
        }
    }
}
