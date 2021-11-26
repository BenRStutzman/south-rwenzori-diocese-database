using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SrdDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Data.Commands;
using SrdDatabase.Attributes;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
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

        [HttpGet("details/{id}")]
        public async Task<ParishDetails> Details(int id)
        {
            return await _mediator.Send(new GetParishDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Parish>> GetAll()
        {
            return await _mediator.Send(new GetAllParishes.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Parish>> Search(SearchParishes.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("save")]
        public async Task<int> Save(SaveParish.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(Domain.Commands.DeleteParish.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
