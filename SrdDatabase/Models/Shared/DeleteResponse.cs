namespace SrdDatabase.Models.Shared
{
    public class DeleteResponse
    {
        public bool Succeeded { get; }

        public string ErrorMessage { get; }

        private DeleteResponse(bool succeeded = true, string errorMessage = null)
        {
            Succeeded = succeeded;
            ErrorMessage = errorMessage;
        }

        public static DeleteResponse ForSuccess() => new();

        public static DeleteResponse ForError(string errorMessage) => new(false, errorMessage);
    }
}
