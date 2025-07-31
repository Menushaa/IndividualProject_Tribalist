using IndividualProject.DTO;
using IndividualProject.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IndividualProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddReview([FromBody] CreateReviewDto dto)
        {
            var result = await _reviewRepository.AddReviewAsync(dto);
            if (!result) return NotFound("Item not found");

            return Ok("Review added successfully");
        }

        [HttpGet("Item/{itemId}")]
        public async Task<IActionResult> GetReviewsForItem(int itemId)
        {
            var reviews = await _reviewRepository.GetReviewsByItemId(itemId);
            return Ok(reviews);
        }

        [HttpGet("Item/{itemId}/Average")]
        public async Task<IActionResult> GetAverageRating(int itemId)
        {
            var avg = await _reviewRepository.GetAverageRatingForItem(itemId);
            return Ok(avg);
        }
    }

}
