using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class CreateItemDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
    }
}
