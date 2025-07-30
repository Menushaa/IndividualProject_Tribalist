using IndividualProject.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
