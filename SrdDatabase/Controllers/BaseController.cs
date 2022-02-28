using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using SrdDatabase.Models.Users;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace SrdDatabase.Controllers
{
    public class BaseController : Controller
    {
        public User CurrentUser => (User)HttpContext.Items["User"];
    
        public IActionResult ToCsv(IEnumerable<object> collection)
        {
            var memoryStream = new MemoryStream();
            var streamWriter = new StreamWriter(memoryStream);
            var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

            csvWriter.WriteRecords(collection);
            memoryStream.Position = 0;

            return File(memoryStream, "text/csv", "testname.csv");
        }
    }
}
