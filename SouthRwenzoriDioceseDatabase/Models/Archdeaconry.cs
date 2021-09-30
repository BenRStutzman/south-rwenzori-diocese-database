namespace SouthRwenzoriDioceseDatabase.Models
{
    public class Archdeaconry
    {
        public int Id { get; }

        public string Name { get;  }
        
        public Archdeaconry(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
