using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Attributes;
using SrdDatabase.Domain.Queries.Congregations;
using System.IO;
using CsvHelper;
using System.Globalization;
using SrdDatabase.Models.Reports;

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
        public async Task<IActionResult> Index(ReportParameters parameters)
        {
            // TODO: generate real report
            var fileName = "test_report.csv";
            var rows = await _mediator.Send(new GetAllCongregations.Query());

            var memoryStream = new MemoryStream();
            var streamWriter = new StreamWriter(memoryStream);
            var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

            csvWriter.WriteRecords(rows);
            memoryStream.Position = 0;

            return File(memoryStream, "text/csv", fileName);
        }
    }
}