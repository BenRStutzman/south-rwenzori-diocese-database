namespace SrdDatabase.Models
{
    public class Parish
    {
        public int Id { get; }

        public string Name { get; }

        public string Archdeaconry { get; }
        
        public Parish(int id, string name, string archdeaconry)
        {
            Id = id;
            Name = name;
            Archdeaconry = archdeaconry;
        }
    }
}
