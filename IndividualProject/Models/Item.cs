using System.ComponentModel.DataAnnotations;

namespace IndividualProject.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public double Price { get; set; }
        public int SellerId { get; set; }
        public Seller Seller { get; set;}
    }
}
