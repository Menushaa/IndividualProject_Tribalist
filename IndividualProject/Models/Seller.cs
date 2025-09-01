using System.ComponentModel.DataAnnotations;

namespace IndividualProject.Models
{
    public class Seller
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Address { get; set; }
        public string phoneNumber { get; set; }
        public string? ProfileUrl { get; set; }
        public string Role { get; set; }
        public string? Otp { get; set; }

        public DateTime CreatedAt { get; set; }
        public bool isSuspended { get; set; }

    }
}
