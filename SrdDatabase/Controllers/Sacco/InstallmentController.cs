using MediatR;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using System.Collections.Generic;
using System.Threading.Tasks;
using SrdDatabase.Models.Sacco.Installments;
using SrdDatabase.Models.Shared;
using SrdDatabase.Domain.Queries.Sacco.Installments;
using SrdDatabase.Models.Users;

namespace SrdDatabase.Controllers.Sacco
{
    [ApiController]
    [Authorize(UserRole.Sacco)]
    [Route("api/sacco/[controller]")]
    public class InstallmentController : BaseController
    {
        private readonly IMediator _mediator;

        public InstallmentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<Installment> GetById(int id)
        {
            return await _mediator.Send(new GetInstallmentById.Query(id));
        }

        [HttpGet("details/{id}")]
        public async Task<InstallmentDetails> Details(int id)
        {
            return await _mediator.Send(new GetInstallmentDetails.Query(id));
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Installment>> GetAll()
        {
            return await _mediator.Send(new GetAllInstallments.Query());
        }
    }
}
