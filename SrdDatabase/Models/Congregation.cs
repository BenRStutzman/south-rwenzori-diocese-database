namespace SrdDatabase.Models
{
    public class Congregation
    {
        public int Id { get; }

        public string Name { get; }

        public int ParishId { get; }

        public string Parish { get; }

        public Congregation(
            int id,
            string name,
            int parishId,
            string parish,
            string archdeaconry
            )
        {
            Id = id;
            Name = name;
            ParishId = parishId;
            Parish = parish;
            Archdeaconry = archdeaconry;
        }

        // for Dapper
        public Congregation()
        {
        }
    }
}
