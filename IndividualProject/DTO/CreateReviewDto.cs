using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class CreateReviewDto
    {
        [Range(1, 5)]
        public int Rating { get; set; }
        public string Comment { get; set; }
        public int ItemId { get; set; }
    }
}
