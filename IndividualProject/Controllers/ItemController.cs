using IndividualProject.DTO;
using IndividualProject.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.JavaScript;

namespace IndividualProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;
        private readonly ISellerRepository _sellerRepository;
        private IConfiguration _config;

        public ItemController(IItemRepository itemRepository, ISellerRepository sellerRepository, IConfiguration config)
        {
            _config = config;
            _itemRepository = itemRepository;
            _sellerRepository = sellerRepository;
        }

        [HttpPost("CreateItem/{SellerId}")]
        public async Task<IActionResult> CreateSubject(int SellerId, [FromBody] CreateItemDto itemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _itemRepository.CreateItem(SellerId, itemDto);
            if (!result)
            {
                return NotFound(new { message = "Seller not found" });
            }

            return CreatedAtAction(nameof(GetItem), new { SellerId, id = itemDto.Name }, itemDto);
        }

        [HttpGet("GetItem/{SellerId}/{id}")]
        public async Task<IActionResult> GetItem(int SellerId, int id)
        {
            var item = _itemRepository.GetItem(SellerId, id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpGet("GetAll/{SellerId}")]
        public async Task<IActionResult> GetItemsBySellerId(int SellerId)
        {
            var items = await _itemRepository.GetItemsBySellerId(SellerId);
            if (items == null || !items.Any())
            {
                return NotFound(new { message = "No items found for this seller" });
            }
            return Ok(items);
        }

        [HttpDelete("Delete/{Id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _itemRepository.DeleteItem(id);
            if (item == null)
            {
                return NotFound("Subject not found");
            }

            return Ok(item);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] CreateItemDto itemDto)
        {
            var item = await _itemRepository.UpdateItem(id, itemDto);
            if (item == null)
            {
                return NotFound(new { message = "Item not found" });
            }

            return Ok(item);
        }

        [HttpGet("Getall")]
        public async Task<IActionResult> GetAllItem()
        {
            try
            {
                var itemsWithRatings = await _itemRepository.GetAllItem();
                return Ok(itemsWithRatings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Filter")]
        public async Task<IActionResult> FilterItems([FromBody] ItemFilterDto filter)
        {
            var items = await _itemRepository.FilterItems(filter);
            return Ok(items);
        }

    }
}
