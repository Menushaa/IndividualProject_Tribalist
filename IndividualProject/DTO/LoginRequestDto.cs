using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class LoginRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
