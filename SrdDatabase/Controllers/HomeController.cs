﻿using MediatR;
using System.Threading.Tasks;
using SrdDatabase.Models.Diocese;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Domain.Queries.Diocese;

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
