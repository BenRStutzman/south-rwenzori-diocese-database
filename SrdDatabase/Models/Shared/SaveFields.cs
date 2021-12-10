using System;
using System.ComponentModel.DataAnnotations;

namespace SrdDatabase.Models.Shared
{
    public class SaveFields
    {
        [Range(1, int.MaxValue)]
        public int? UserId { get; private set; }

        public SaveFields(int? userId = null)
        {
            UserId = userId;
        }

        public void SetUserId(int userId)
        {
            UserId = userId;
        }
    }
}
