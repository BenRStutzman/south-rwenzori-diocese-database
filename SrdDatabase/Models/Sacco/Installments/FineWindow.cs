using System;
namespace SrdDatabase.Models.Sacco.Installments
{
    public class FineWindow
    {
        public DateTime StartDate { get; }

        public int Fine { get; }

        public FineWindow(DateTime startDate, int fine)
        {
            StartDate = startDate;
            Fine = fine;
        }
    }
}
