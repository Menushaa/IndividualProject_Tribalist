using IndividualProject.DTO;

namespace IndividualProject.Repository.IRepository
{
    public interface IReviewRepository
    {
        Task<List<ReviewDto>> GetReviewsByItemId(int itemId);
        Task<double> GetAverageRatingForItem(int itemId);
        Task<bool> AddReviewAsync(CreateReviewDto reviewDto);
    }
}
