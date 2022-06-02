using System;
namespace SrdDatabase.Models.Sacco.Installments
{
    public class FineWindow
    {
        public DateTime StartDate { get; }

        public sbyte FinePercentage { get; }
        
        public int FineDue { get; }

        public int TotalDue { get; }

        public FineWindow(DateTime startDate, sbyte finePercentage, int fineDue, int totalDue)
        {
            StartDate = startDate;
            FinePercentage = finePercentage;
            FineDue = fineDue;
            TotalDue = totalDue;
        }

        // For Dapper
        public FineWindow()
        {
        }
    }
}
