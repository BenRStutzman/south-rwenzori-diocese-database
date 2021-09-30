namespace SouthRwenzoriDioceseDatabase.Models
{
    public class Congregation
    {
        public int Id { get; }

        public string Name { get; }

        public string Parish { get; }

        public string Archdeaconry { get; }

        public Congregation(
            int id,
            string name,
            string parish,
            string archdeaconry
            )
        {
            Id = id;
            Name = name;
            Parish = parish;
            Archdeaconry = archdeaconry;
        }
    }
}
