using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class UpdateSellerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string? ProfileUrl { get; set; }
        public string phoneNumber { get; set; }

    }
}
