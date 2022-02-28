namespace SrdDatabase.Models.Quotas
{
    public class QuotaDetails
    {
        public Quota Quota { get; }

        public QuotaDetails(Quota quota)
        {
            Quota = quota;
        }
    }

}
