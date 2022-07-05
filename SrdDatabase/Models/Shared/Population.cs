namespace SrdDatabase.Models.Shared
{
    public class Population
    {
        public int? Males0To12 { get; }

        public int? Females0To12 { get; }

        public int? Males13To17 { get; }

        public int? Females13To17 { get; }

        public int? Males18To35 { get; }

        public int? Females18To35 { get; }

        public int? Males36AndAbove { get; }

        public int? Females36AndAbove { get; }

        public Population(
                int? males0To12,
                int? females0To12,
                int? males13To17,
                int? females13To17,
                int? males18To35,
                int? females18To35,
                int? males36AndAbove,
                int? females36AndAbove)
        {
            Males0To12 = males0To12;
            Females0To12 = females0To12;
            Males13To17 = males13To17;
            Females13To17 = females13To17;
            Males18To35 = males18To35;
            Females18To35 = females18To35;
            Males36AndAbove = males36AndAbove;
            Females36AndAbove = females36AndAbove;
        }

        // for Dapper
        public Population()
        {
        }
    }
}
