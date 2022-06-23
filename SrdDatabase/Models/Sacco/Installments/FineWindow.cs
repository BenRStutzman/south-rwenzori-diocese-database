using System;
namespace SrdDatabase.Models.Sacco.Installments
{
    public class FineWindow
    {
        public DateTime StartDate { get; }

        public sbyte FinePercentage { get; }
        
        public int Fine { get; }

        public FineWindow(DateTime startDate, sbyte finePercentage, int fine)
        {
            StartDate = startDate;
            FinePercentage = finePercentage;
            Fine = fine;
        }

        // For Dapper
        public FineWindow()
        {
        }
    }
}
