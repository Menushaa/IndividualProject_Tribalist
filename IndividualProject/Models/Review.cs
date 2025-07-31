using System.ComponentModel.DataAnnotations;

namespace IndividualProject.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        [Range(1, 5)]
        public int Rating { get; set; }
        public string Comment { get; set; }
        [Required]
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int CustomerId { get; set; } // optional if you're adding Customer later
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
