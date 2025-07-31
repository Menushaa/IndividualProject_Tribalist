using AutoMapper;
using IndividualProject.Data;
using IndividualProject.DTO;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace IndividualProject.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ReviewRepository(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<ReviewDto>> GetReviewsByItemId(int itemId)
        {
            var reviews = await _dbContext.Reviews
                .Where(r => r.ItemId == itemId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return _mapper.Map<List<ReviewDto>>(reviews);
        }

        public async Task<double> GetAverageRatingForItem(int itemId)
        {
            var ratings = await _dbContext.Reviews
                .Where(r => r.ItemId == itemId)
                .Select(r => r.Rating)
                .ToListAsync();

            return ratings.Count > 0 ? ratings.Average() : 0;
        }

        public async Task<bool> AddReviewAsync(CreateReviewDto reviewDto)
        {
            var item = await _dbContext.Items.FindAsync(reviewDto.ItemId);
            if (item == null) return false;

            var review = _mapper.Map<Review>(reviewDto);
            _dbContext.Reviews.Add(review);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }

}
