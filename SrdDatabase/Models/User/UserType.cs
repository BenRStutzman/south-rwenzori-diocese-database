namespace SrdDatabase.Models.User
{
    public class UserType
    {
        public sbyte Id { get; }

        public string Name { get; }

        public UserType(sbyte id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
