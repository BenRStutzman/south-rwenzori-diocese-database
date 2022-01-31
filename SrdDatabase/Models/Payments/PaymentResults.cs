using SrdDatabase.Models.Shared;
using System.Collections.Generic;

namespace SrdDatabase.Models.Payments
{
    public class PaymentResults : PagedResults
    {
        public IEnumerable<Payment> Payments { get; }

        public PaymentResults(
            int pageNumber,
            int? pageSize,
            int totalResults,
            IEnumerable<Payment> payments)
            : base(pageNumber, pageSize, totalResults)
        {
            Payments = payments;
        }
    }
}
