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

        [HttpPost("all")]
        public async Task<IEnumerable<Parish>> GetAllParishes()
        {
            return await _mediator.Send(new GetAllParishes.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Parish>> SearchParishes([FromBody] SearchParishes.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddParish([FromBody] AddParish.Command command)
        {
            var parishId = await _mediator.Send(command);

            return Ok($"Parish added with ID {parishId}");
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
