using System.Collections.Generic;

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

    public static class AllUserRoles
    {
        public static Dictionary<UserRole, IEnumerable<UserRole>> WhoAreAtLeast =>
            new()
            {
                { UserRole.Viewer, new[] { UserRole.Viewer, UserRole.Contributor, UserRole.Accountant, UserRole.Editor, UserRole.Sacco, UserRole.Administrator } },
                { UserRole.Contributor, new[] { UserRole.Contributor, UserRole.Editor, UserRole.Administrator } },
                { UserRole.Accountant, new[] { UserRole.Accountant, UserRole.Editor, UserRole.Administrator } },
                { UserRole.Editor, new[] { UserRole.Editor, UserRole.Administrator } },
                { UserRole.Sacco, new[] { UserRole.Sacco, UserRole.Administrator } },
                { UserRole.Administrator, new[] { UserRole.Administrator } },
            };
    }

}