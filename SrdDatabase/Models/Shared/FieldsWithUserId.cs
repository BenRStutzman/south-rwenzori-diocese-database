using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Shared
{
    public class FieldsWithUserId
    {
        [Range(1, int.MaxValue)]
        public int? UserId { get; private set; }

        public FieldsWithUserId(int? userId = null)
        {
            UserId = userId;
        }

        public void SetUserId(int userId)
        {
            UserId = userId;
        }
    }
}
