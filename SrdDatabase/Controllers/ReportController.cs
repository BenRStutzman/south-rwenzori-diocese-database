using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Domain.Queries.Reports;

namespace SrdDatabase.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ReportController : BaseController
    {
        private readonly IMediator _mediator;

        public ReportController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Index(GetReport.Query query)
        {
            var report = await _mediator.Send(query);
            return File(report.Data, "text/csv", report.FileName);
        }
    }
}