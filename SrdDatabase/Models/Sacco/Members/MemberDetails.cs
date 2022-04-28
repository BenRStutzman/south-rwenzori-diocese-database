namespace SrdDatabase.Models.Sacco.Members
{
    public class MemberDetails
    {
        public Member Member { get; }

        public MemberDetails(Member member)
        {
            Member = member;
        }
    }

}
