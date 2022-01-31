using SrdDatabase.Models.Charges;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Attributes
{
    public class StartAndEndYearsAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var chargeFields = (ChargeFields)validationContext.ObjectInstance;

            if (chargeFields.EndYear < chargeFields.StartYear)
            {
                return new ValidationResult(
                    "The end year must be greater than or equal to the start year.");
            }

            return ValidationResult.Success;
        }
    }
}
