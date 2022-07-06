using CsvHelper;
using CsvHelper.Configuration;
using SrdDatabase.Models.Reports;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace SrdDatabase.Helpers
{
    public static class ReportHelper
    {
        public static string Dates(DateTime? startDate, DateTime endDate)
        {
            return $"{(startDate.HasValue ? $"{GeneralHelper.FormattedDate(startDate.Value)}_to" : "through")}_{GeneralHelper.FormattedDate(endDate)}";
        }


        public static IEnumerable<string> RowWithOffset(IEnumerable<string> row, int offset)
        {
            return Enumerable.Repeat(string.Empty, offset).Concat(row);
        }

        public static Report WriteReport(IEnumerable<IEnumerable<string>> rows, string fileName)
        {
            var configuration = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = false
            };

            using var memoryStream = new MemoryStream();
            using var streamWriter = new StreamWriter(memoryStream);
            using var csvWriter = new CsvWriter(streamWriter, configuration);

            foreach (var row in rows)
            {
                foreach (var field in row)
                {
                    csvWriter.WriteField(field);
                }

                csvWriter.NextRecord();
            }

            streamWriter.Flush();
            var data = memoryStream.ToArray();

            return new Report(fileName, data);
        }
    }
}
