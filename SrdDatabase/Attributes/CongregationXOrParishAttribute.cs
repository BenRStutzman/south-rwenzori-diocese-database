using SrdDatabase.Models.Events;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Attributes
{
    public class CongregationXOrParishAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var eventFields = (EventFields)validationContext.ObjectInstance;

            if (eventFields.CongregationId.HasValue == eventFields.ParishId.HasValue)
            {
                return new ValidationResult(
                    "You must specify either a congregation or a parish, but not both.");
            }

            return ValidationResult.Success;
        }
    }
}
