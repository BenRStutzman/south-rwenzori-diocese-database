namespace SouthRwenzoriDioceseDatabase.Models
{
    public class Parish
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Archdeaconry { get; set; }
        
        public Parish(int id, string name, string archdeaconry)
        {
            Id = id;
            Name = name;
            Archdeaconry = archdeaconry;
        }
    }
}
