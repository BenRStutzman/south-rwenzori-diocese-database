using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Domain.Queries;
using SouthRwenzoriDioceseDatabase.Data.Queries;
using SouthRwenzoriDioceseDatabase.Data.Commands;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    [Route("/api/congregation")]
    public class CongregationController : Controller
    {
        private readonly IMediator _mediator;

        public CongregationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Congregation> GetCongregationById(int id)
        {
            return await _mediator.Send(new GetCongregationById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Congregation>> GetAllCongregationes()
        {
            return await _mediator.Send(new GetAllCongregations.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Congregation>> SearchCongregations([FromBody] SearchCongregations.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<IActionResult> AddCongregation([FromBody] SaveCongregation.Command command)
        {
            var congregationId = await _mediator.Send(command);

            var message = command.Id == null
                ? $"Congregation added with ID {congregationId}"
                : "Congregation updated";

            return Ok(message);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteCongregation([FromBody] Domain.Commands.DeleteCongregation.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded
                ? Ok("Congregation deleted")
                : BadRequest(response.ErrorMessage);
        }
    }
}
