namespace SrdDatabase.Models
{
    public class UserType
    {
        public sbyte Id { get; }

        public UserRole Name { get; }

        public UserType(sbyte id, UserRole name)
        {
            Id = id;
            Name = name;
        }
    }
}
