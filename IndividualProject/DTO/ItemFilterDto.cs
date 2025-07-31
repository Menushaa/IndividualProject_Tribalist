namespace IndividualProject.DTO
{
    public class ItemFilterDto
    {
        public int? CategoryId { get; set; } 
        public double? MinPrice { get; set; }
        public double? MaxPrice { get; set; }
        public double? MinRating { get; set; } = 0;
        public string? SortBy { get; set; } = "Newest"; 
    }

}
