using System.Collections.Generic;

namespace SrdDatabase.Models.Reports
{
    public class Report
    {
        public string FileName { get; }

        public IEnumerable<object> Rows { get; }

        public Report(
            string fileName, IEnumerable<object> rows)
        {
            FileName = fileName;
            Rows = rows;
        }
    }
}
