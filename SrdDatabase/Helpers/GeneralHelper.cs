using System;

namespace SrdDatabase.Helpers
{
    public static class GeneralHelper
    {
        public static string FormattedDate(DateTime? date)
        {
            return date.HasValue ? $"{date.Value.Year}-{date.Value.Month}-{date.Value.Day}" : string.Empty;
        }
    }
}
