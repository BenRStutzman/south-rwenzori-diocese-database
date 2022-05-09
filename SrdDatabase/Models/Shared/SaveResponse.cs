using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace SrdDatabase.Models.Shared
{
    public class SaveResponse
    {
        public bool Succeeded { get; }

        public string ErrorField { get; }

        public string ErrorMessage { get; }

        public int? Id { get; }

        private SaveResponse(int? id = null, string errorMessage = null, string errorField = null)
        {
            Succeeded = id.HasValue;
            Id = id;
            ErrorField = errorField;
            ErrorMessage = errorMessage;
        }

        public static SaveResponse ForSuccess(int id) => new(id);

        public static SaveResponse ForError(string errorMessage, string errorField = null) => new(null, errorMessage, errorField ?? string.Empty);
    }
}
