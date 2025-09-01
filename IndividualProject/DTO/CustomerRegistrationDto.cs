using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class CustomerRegistrationDto
    {
        [Required]
        public string Name { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
