using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class LoginRequestDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
