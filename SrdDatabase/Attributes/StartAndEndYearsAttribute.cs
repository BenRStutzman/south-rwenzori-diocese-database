using SrdDatabase.Models.Quotas;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Attributes
{
    public class StartAndEndYearsAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var quotaFields = (QuotaFields)validationContext.ObjectInstance;

            if (quotaFields.EndYear < quotaFields.StartYear)
            {
                return new ValidationResult(
                    "The end year must be greater than or equal to the start year.");
            }

            return ValidationResult.Success;
        }
    }
}
