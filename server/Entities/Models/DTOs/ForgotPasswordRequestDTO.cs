using System.ComponentModel.DataAnnotations;

namespace server.Entities.Models.DTOs
{
    public class ForgotPasswordRequestDTO
    {
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; } = string.Empty;
    }
}
