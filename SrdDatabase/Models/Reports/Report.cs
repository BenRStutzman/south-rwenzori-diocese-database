namespace SrdDatabase.Models.Reports
{
    public class Report
    {
        public string FileName { get; }

        public byte[] Data { get; }

        public Report(
            string fileName, byte[] data)
        {
            FileName = fileName;
            Data = data;
        }
    }
}
