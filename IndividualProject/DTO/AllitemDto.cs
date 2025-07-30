using System.ComponentModel.DataAnnotations;

namespace IndividualProject.DTO
{
    public class AllitemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public double Price { get; set; }
        public double averageRating { get; set; } = 0;
        public int SellerId { get; set; }
        public string SellerName { get; set; }
    }
}
