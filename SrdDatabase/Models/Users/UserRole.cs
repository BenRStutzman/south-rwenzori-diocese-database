using System.Collections.Generic;

namespace SrdDatabase.Models.Users
{
    public enum UserRole
    {
        Basic,          // Can only view basic data (church structure, censuses, events)
        Viewer,         // Can only view data (including balances, quotas)
        Contributor,    // Can add events/censuses and edit ones they created. Still can't view balances, quotas.
        Accountant,     // Can view balances and add/edit transactions
        Editor,         // Can edit everything except users
        Sacco,          // Can edit SACCO-related things
        Administrator,  // Can edit everything
    }

    public static class AllUserRoles
    {
        public static Dictionary<UserRole, IEnumerable<UserRole>> WhoAreAtLeast =>
            new()
            {
                { UserRole.Basic, new[] { UserRole.Basic, UserRole.Viewer, UserRole.Contributor, UserRole.Accountant, UserRole.Editor, UserRole.Sacco, UserRole.Administrator } },
                { UserRole.Viewer, new[] { UserRole.Viewer, UserRole.Accountant, UserRole.Editor, UserRole.Administrator } },
                { UserRole.Contributor, new[] { UserRole.Contributor, UserRole.Editor, UserRole.Administrator } },
                { UserRole.Accountant, new[] { UserRole.Accountant, UserRole.Editor, UserRole.Administrator } },
                { UserRole.Editor, new[] { UserRole.Editor, UserRole.Administrator } },
                { UserRole.Sacco, new[] { UserRole.Sacco, UserRole.Administrator } },
                { UserRole.Administrator, new[] { UserRole.Administrator } },
            };
    }

}