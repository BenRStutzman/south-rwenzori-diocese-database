namespace SrdDatabase.Models.ChristianCounts
{
    public class ChristianCountDetails
    {
        public ChristianCount ChristianCount { get; }

        public ChristianCountDetails(ChristianCount christianCount)
        {
            ChristianCount = christianCount;
        }
    }

}
