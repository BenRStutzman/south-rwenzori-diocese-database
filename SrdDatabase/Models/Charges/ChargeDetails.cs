namespace SrdDatabase.Models.Charges
{
    public class ChargeDetails
    {
        public Charge Charge { get; }

        public ChargeDetails(Charge charge)
        {
            Charge = charge;
        }
    }

}
