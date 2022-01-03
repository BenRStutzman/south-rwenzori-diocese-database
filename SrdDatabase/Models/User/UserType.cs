namespace SrdDatabase.Models.Users
{
    public class UserType
    {
        public sbyte Id { get; }

        public UserRole Name { get; }

        public sbyte PrivilegeOrder { get; }

        public UserType(sbyte id, UserRole name, sbyte privilegeOrder)
        {
            Id = id;
            Name = name;
            PrivilegeOrder = privilegeOrder;
        }

        // for Dapper
        public UserType()
        {
        }
    }
}
