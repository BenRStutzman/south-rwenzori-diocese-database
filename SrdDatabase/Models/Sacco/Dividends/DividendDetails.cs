namespace SrdDatabase.Models.Sacco.Dividends
{
    public class DividendDetails
    {
        public Dividend Dividend { get; }

        public DividendDetails(Dividend dividend)
        {
            Dividend = dividend;
        }
    }

}
