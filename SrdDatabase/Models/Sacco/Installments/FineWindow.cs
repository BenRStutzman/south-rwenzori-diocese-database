using System;
namespace SrdDatabase.Models.Sacco.Installments
{
    public class FineWindow
    {
        public DateTime StartDate { get; }

        public int FineDue { get; }

        public FineWindow(DateTime startDate, int fineDue)
        {
            StartDate = startDate;
            FineDue = fineDue;
        }

        // For Dapper
        public FineWindow()
        {
        }
    }
}
