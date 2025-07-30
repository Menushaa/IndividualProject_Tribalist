using AutoMapper;
using Azure.Core;
using IndividualProject.Data;
using IndividualProject.DTO;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace IndividualProject.Repository
{
    public class ItemRepository : IItemRepository
    {
        private ApplicationDbContext _DbContext;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public ItemRepository(ApplicationDbContext DbContext, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _DbContext = DbContext;
            _mapper = mapper;
        }

        public async Task<bool> CreateItem(int SellerId, CreateItemDto itemDto)
        {
            var seller = await _DbContext.Items.FindAsync(SellerId);
            if (seller == null)
            {
                return false; // Tutor not found
            }

            var item = new Item
            {
                Name = itemDto.Name,
                Description = itemDto.Description,
                CoverImage = itemDto.CoverImage,
                Price = itemDto.Price,
                SellerId = SellerId,
            };

            _DbContext.Items.Add(item);
            await _DbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<AllitemDto>> GetAllItem()
        {
            var itemsWithRatings = await _DbContext.Items
                .Include(t => t.Seller)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Description,
                    t.CoverImage,
                    t.Price,
                    SellerId = t.Seller.Id,
                    SellerName = t.Seller.Name,
                    //ratings = _DbContext.Reviews
                    //    .Where(r => r.itemId == t.Id)
                    //    .Select(r => r.rating)
                    //    .ToList()
                })
                .ToListAsync();

            var items = itemsWithRatings
                .Select(t => new AllitemDto { 
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    CoverImage = t.CoverImage,
                    Price = t.Price,
                    SellerId = t.SellerId,
                    SellerName = t.SellerName
                    //averageRating = s.ratings.DefaultIfEmpty(0).Average()
                })
                .ToList();
            return items;

        }

        public async Task<Item> GetItem(int SellerId, int id)
        {
            var item = await GetItemById(id);
            if (item == null || item.SellerId != SellerId)
            {
                return null;
            }
            return item;
        }

        public async Task<Item> GetItemById(int id)
        {
            return await _DbContext.Items.FindAsync(id);     
        }

        public async Task<List<Item>> GetItemsBySellerId(int SellerId)
        {
            return await _DbContext.Items.Where(t => t.SellerId == SellerId).ToListAsync();
        }

        public async Task<Item> UpdateItem(int id, CreateItemDto itemDto)
        {
            var item = await _DbContext.Items.FindAsync(id);
            if (item == null)
            {
                return null;
            }

            _mapper.Map(item, itemDto);
            await _DbContext.SaveChangesAsync();
            return item;
        }
        public async Task<Item> DeleteItem(int id)
        {
            var item = await _DbContext.Items.FindAsync(id);
            if (item == null)
            {
                return null;
            }
            _DbContext.Items.Remove(item);
            await _DbContext.SaveChangesAsync();
            return item;
        }
    }
}
