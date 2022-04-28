namespace SrdDatabase.Models.Users
{
    public enum UserRole
    {
        Viewer,         // Can only view data
        Contributor,    // Can add events and edit their own events
        Accountant,     // Can view balances and add/edit transactions
        Sacco,          // Can edit SACCO-related things
        Editor,         // Can edit everything except users
        Administrator,  // Can edit everything
    }
}