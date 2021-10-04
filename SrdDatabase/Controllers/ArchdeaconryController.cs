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
    public class ArchdeaconryController : Controller
    {
        private readonly IMediator _mediator;

        public ArchdeaconryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Archdeaconry> GetById(int id)
        {
            return await _mediator.Send(new GetArchdeaconryById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Archdeaconry>> GetAll()
        {
            return await _mediator.Send(new GetAllArchdeaconries.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Archdeaconry>> Search([FromBody] SearchArchdeaconries.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<IActionResult> Add([FromBody] SaveArchdeaconry.Command command)
        {
            var archdeaconryId = await _mediator.Send(command);

            var message = command.Id == null
                ? $"Archdeaconry added with ID {archdeaconryId}"
                : "Archdeaconry updated";

            return Ok(message);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] Domain.Commands.DeleteArchdeaconry.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok("Archdeaconry deleted") : BadRequest(response.ErrorMessage);
        }
    }
}
