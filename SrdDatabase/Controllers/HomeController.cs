using MediatR;
using System.Threading.Tasks;
using System.Collections.Generic;
using SrdDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Domain.Queries;
using SrdDatabase.Attributes;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly IMediator _mediator;

        public HomeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("details")]
        public async Task<DioceseDetails> Details()
        {
            return await _mediator.Send(new GetDioceseDetails.Query());
        }
    }
}
