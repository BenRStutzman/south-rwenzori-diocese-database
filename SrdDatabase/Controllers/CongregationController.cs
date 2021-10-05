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
        public async Task<SaveResponse> Save([FromBody] SaveCongregation.Command command)
        {
            var congregationId = await _mediator.Send(command);

            return SaveResponse.ForSuccess(congregationId);
        }

        [HttpPost("delete")]
        public async Task<DeleteResponse> Delete([FromBody] Domain.Commands.DeleteCongregation.Command command)
        {
            var response = await _mediator.Send(command);

            return response.Succeeded
                ? DeleteResponse.ForSuccess()
                : DeleteResponse.ForError(response.ErrorMessage);
        }
    }
}
