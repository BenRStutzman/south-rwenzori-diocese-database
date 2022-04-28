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
        public static Dictionary<UserRole, IEnumerable<UserRole>> ForUserRole =>
            new()
            {
                { UserRole.Viewer, new[] { UserRole.Viewer } },
                { UserRole.Contributor, new[] { UserRole.Viewer, UserRole.Contributor } },
                { UserRole.Accountant, new[] { UserRole.Viewer, UserRole.Contributor, UserRole.Accountant } },
                { UserRole.Editor, new[] { UserRole.Viewer, UserRole.Contributor, UserRole.Accountant, UserRole.Editor } },
                { UserRole.Sacco, new[] { UserRole.Viewer, UserRole.Contributor, UserRole.Sacco } },
                { UserRole.Administrator, new[] { UserRole.Viewer, UserRole.Contributor, UserRole.Accountant, UserRole.Editor, UserRole.Sacco, UserRole.Administrator } },
            };
    }

}