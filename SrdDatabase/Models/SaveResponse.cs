namespace SrdDatabase.Models
{
    public class SaveResponse
    {
        public bool Succeeded { get; }

        public int? Id { get; }

        public string ErrorMessage { get; }

        private SaveResponse(bool succeeded, int? id, string errorMessage)
        {
            Succeeded = succeeded;
            Id = id;
            ErrorMessage = errorMessage;
        }

        public static SaveResponse ForSuccess(int id) => new(true, id, null);

        public static SaveResponse ForError(string errorMessage) => new(false, null, errorMessage);
    }
}
