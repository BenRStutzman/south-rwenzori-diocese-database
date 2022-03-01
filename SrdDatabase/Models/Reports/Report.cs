using System.Collections.Generic;

namespace SrdDatabase.Models.Reports
{
    public class Report
    {
        public string Title { get; }

        public IEnumerable<object> Rows { get; }

        public Report(
            string title, IEnumerable<object> rows)
        {
            Title = title;
            Rows = rows;
        }
    }
}
