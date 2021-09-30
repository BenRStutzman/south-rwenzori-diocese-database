using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SouthRwenzoriDioceseDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SouthRwenzoriDioceseDatabase.Domain.Queries;

namespace SouthRwenzoriDioceseDatabase.Controllers
{
    [Route("/api/archdeaconry")]
    public class ArchdeaconryController : Controller
    {
        private readonly IMediator _mediator;

        public ArchdeaconryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Archdeaconry> GetArchdeaconryById(int id)
        {
            return await _mediator.Send(new GetArchdeaconryById.Query(id));
        }
        
        [HttpPost("all")]
        public async Task<IEnumerable<Archdeaconry>> GetAllArchdeaconries()
        {
            return await _mediator.Send(new GetAllArchdeaconries.Query());
        }
    }
}
