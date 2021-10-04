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
    public class CongregationController : Controller
    {
        private readonly IMediator _mediator;

        public CongregationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Congregation> GetById(int id)
        {
            return await _mediator.Send(new GetCongregationById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Congregation>> GetAll()
        {
            return await _mediator.Send(new GetAllCongregations.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Congregation>> Search([FromBody] SearchCongregations.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<IActionResult> Add([FromBody] SaveCongregation.Command command)
        {
            var congregationId = await _mediator.Send(command);

            var message = command.Id == null
                ? $"Congregation added with ID {congregationId}"
                : "Congregation updated";

            return Ok(message);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] Domain.Commands.DeleteCongregation.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded
                ? Ok("Congregation deleted")
                : BadRequest(response.ErrorMessage);
        }
    }
}
