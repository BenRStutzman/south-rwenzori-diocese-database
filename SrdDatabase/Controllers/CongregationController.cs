using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Data.Commands;
using SrdDatabase.Attributes;
using SrdDatabase.Models.Congregations;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
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

        [HttpGet("details/{id}")]
        public async Task<Details> Details(int id)
        {
            return await _mediator.Send(new GetCongregationDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Congregation>> GetAll()
        {
            return await _mediator.Send(new GetAllCongregations.Query());
        }

        [HttpPost("search")]
        public async Task<IEnumerable<Congregation>> Search(SearchCongregations.Query query)
        {
            return await _mediator.Send(query);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("save")]
        public async Task<int> Save(SaveCongregation.Command command)
        {
            return await _mediator.Send(command);
        }

        [Authorize(UserRole.Editor)]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete(Domain.Commands.DeleteCongregation.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded ? Ok() : BadRequest(response.ErrorMessage);
        }
    }
}
