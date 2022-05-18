using SrdDatabase.Models.Shared;
using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Sacco.Dividends
{
    public class DividendFields : FieldsWithUserId
    {
        [Required]
        public DateTime Date { get; }

        [Range(0, 100)]
        public decimal Percentage { get; }

        public DividendFields(
            decimal percentage,
            DateTime date,
            int? userId = null) : base(userId)
        {
            Percentage = percentage;
            Date = date;
        }
    }
}
