namespace SrdDatabase.Models.Payments
{
    public class PaymentDetails
    {
        public Payment Payment { get; }

        public PaymentDetails(Payment payment)
        {
            Payment = payment;
        }
    }

}
