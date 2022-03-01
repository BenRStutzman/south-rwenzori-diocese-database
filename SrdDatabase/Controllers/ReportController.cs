using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using System.IO;
using CsvHelper;
using System.Globalization;
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
            var reportTask = _mediator.Send(query);

            var memoryStream = new MemoryStream();
            var streamWriter = new StreamWriter(memoryStream);
            var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

            var report = await reportTask; 
            csvWriter.WriteRecords(report.Rows);
            memoryStream.Position = 0;

            return File(memoryStream, "text/csv", report.FileName);
        }
    }
}