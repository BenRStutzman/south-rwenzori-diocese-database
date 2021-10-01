using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Domain.Queries;
using SouthRwenzoriDioceseDatabase.Domain.Commands;
using SouthRwenzoriDioceseDatabase.Data.Commands;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    [Route("/api/parish")]
    public class ParishController : Controller
    {
        private readonly IMediator _mediator;

        public ParishController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Parish> GetParishById(int id)
        {
            return await _mediator.Send(new GetParishById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Parish>> GetAllParishes()
        {
            return await _mediator.Send(new GetAllParishes.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Parish>> SearchParishes([FromBody] SearchParishes.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<IActionResult> AddParish([FromBody] SaveParish.Command command)
        {
            var parishId = await _mediator.Send(command);

            var message = command.Id == null ? $"Parish added with ID {parishId}" : "Parish updated";

            return Ok(message);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteParish([FromBody] Domain.Commands.DeleteParish.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded
                ? Ok("Parish deleted")
                : BadRequest(response.ErrorMessage);
        }
    }
}
