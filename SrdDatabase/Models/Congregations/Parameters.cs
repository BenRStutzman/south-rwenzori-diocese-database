namespace SrdDatabase.Models.Congregations
{
    public class Parameters
    {
        public string Name { get; }

        public int? ParishId { get; }

        public int? ArchdeaconryId { get; }

        public Parameters(
            string name = null,
            int? parishId = null,
            int? archdeaconryId = null)
        {
            Name = name;
            ParishId = parishId;
            ArchdeaconryId = archdeaconryId;
        }
    }
}
