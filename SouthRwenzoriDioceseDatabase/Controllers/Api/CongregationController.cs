using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Domain.Queries;
using SouthRwenzoriDioceseDatabase.Data.Queries;

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

        [HttpPost("search")]
        public async Task<IEnumerable<Congregation>> GetCongregationes([FromBody] GetCongregations.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("all")]
        public async Task<IEnumerable<Congregation>> GetAllCongregationes()
        {
            return await _mediator.Send(new GetAllCongregations.Query());
        }
    }
}
