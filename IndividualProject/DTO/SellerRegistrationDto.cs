using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class SellerRegistrationDto
    {
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Address { get; set; }
        public string phoneNumber { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
