using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Domain.Queries;

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

        [HttpPost("search")]
        public async Task<IEnumerable<Parish>> SearchParishes([FromBody] SearchParishes.Query query)
        {
            return await _mediator.Send(query);
        }

        [HttpPost("all")]
        public async Task<IEnumerable<Parish>> GetAllParishes()
        {
            return await _mediator.Send(new GetAllParishes.Query());
        }
    }
}
