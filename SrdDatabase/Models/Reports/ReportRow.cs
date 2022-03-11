namespace SrdDatabase.Models.Reports
{
    public class ReportRow
    {
        public string Column1 { get; }

        public string Column2 { get; }

        public string Column3 { get; }

        public string Column4 { get; }

        public string Column5 { get; }

        public ReportRow(
            object column1 = null,
            object column2 = null,
            object column3 = null,
            object column4 = null,
            object column5 = null)
        {
            Column1 = column1?.ToString();
            Column2 = column2?.ToString();
            Column3 = column3?.ToString();
            Column4 = column4?.ToString();
            Column5 = column5?.ToString();
        }
    }
}
