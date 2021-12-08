namespace SrdDatabase.Models.Parishes
{
    public class ParishParameters
    {
        public string Name { get; }

        public int? ArchdeaconryId { get; }

        public ParishParameters(string name = null, int? archdeaconryId = null)
        {
            Name = name;
            ArchdeaconryId = archdeaconryId;
        }
    }
}
