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
    [Route("api/[controller]")]
    public class ParishController : Controller
    {
        private readonly IMediator _mediator;

        public ParishController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Parish> GetById(int id)
        {
            return await _mediator.Send(new GetParishById.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Parish>> GetAll()
        {
            return await _mediator.Send(new GetAllParishes.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Parish>> Search([FromBody] SearchParishes.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<SaveResponse> Save([FromBody] SaveParish.Command command)
        {
            var parishId = await _mediator.Send(command);

            return SaveResponse.ForSuccess(parishId);
        }

        [HttpPost("delete")]
        public async Task<DeleteResponse> Delete([FromBody] Domain.Commands.DeleteParish.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded
                ? DeleteResponse.ForSuccess()
                : DeleteResponse.ForError(response.ErrorMessage);
        }
    }
}
