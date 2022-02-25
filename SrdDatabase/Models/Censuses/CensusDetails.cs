namespace SrdDatabase.Models.Censuses
{
    public class CensusDetails
    {
        public Census Census { get; }

        public CensusDetails(Census census)
        {
            Census = census;
        }
    }

}
