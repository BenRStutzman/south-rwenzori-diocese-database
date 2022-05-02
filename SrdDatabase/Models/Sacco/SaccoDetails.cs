using SrdDatabase.Models.Sacco.Members;

namespace SrdDatabase.Models.Sacco
{
    public class SaccoDetails
    {
        public MemberResults MemberResults { get; }

        public SaccoDetails(
            MemberResults memberResults
            )
        {
            MemberResults = memberResults;
        }

        public SaccoDetails(
            MemberResults memberResults,
            SaccoDetails dioceseDetails
        ) : this(
            memberResults
            )
        {
        }

        // for Dapper
        public SaccoDetails()
        {
        }
    }

}
