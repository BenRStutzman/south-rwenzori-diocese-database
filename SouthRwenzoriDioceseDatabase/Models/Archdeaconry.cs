namespace SouthRwenzoriDioceseDatabase.Models
{
    public class Archdeaconry
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public Archdeaconry(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
