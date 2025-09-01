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
            var seller = await _DbContext.Sellers.FindAsync(SellerId);
            if (seller == null)
            {
                return false; // Seller not found
            }

            var categoryExists = await _DbContext.Categories.AnyAsync(c => c.Id == itemDto.CategoryId);
            if (!categoryExists)
            {
                return false; // Category not found
            }

            var item = new Item
            {
                Name = itemDto.Name,
                Description = itemDto.Description,
                CoverImage = itemDto.CoverImage,
                Price = itemDto.Price,
                SellerId = SellerId,
                CategoryId = itemDto.CategoryId,
            };

            _DbContext.Items.Add(item);
            await _DbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<AllitemDto>> GetAllItem()
        {
            var itemsWithRatings = await _DbContext.Items
                .Include(t => t.Seller)
                .Include(t => t.Reviews)
                .Select(t => new AllitemDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Description = t.Description,
                    CoverImage = t.CoverImage,
                    Price = t.Price,
                    SellerId = t.Seller.Id,
                    SellerName = t.Seller.Name,
                    averageRating = t.Reviews.Any() ? t.Reviews.Average(r => r.Rating) : 0
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
        public async Task<List<AllitemDto>> FilterItems(ItemFilterDto filter)
        {
            var query = _DbContext.Items
                .Include(i => i.Seller)
                .Include(i => i.Reviews)
                .Include(i => i.Category) // if using category table
                .AsQueryable();

            if (filter.CategoryId.HasValue)
                query = query.Where(i => i.CategoryId == filter.CategoryId);

            if (filter.MinPrice.HasValue)
                query = query.Where(i => i.Price >= filter.MinPrice.Value);

            if (filter.MaxPrice.HasValue)
                query = query.Where(i => i.Price <= filter.MaxPrice.Value);

            if (filter.MinRating.HasValue)
                query = query.Where(i => i.Reviews.Any() && i.Reviews.Average(r => r.Rating) >= filter.MinRating);

            // Sorting logic
            query = filter.SortBy switch
            {
                "TopRated" => query.OrderByDescending(i => i.Reviews.Any() ? i.Reviews.Average(r => r.Rating) : 0),
                "PriceLowToHigh" => query.OrderBy(i => i.Price),
                "PriceHighToLow" => query.OrderByDescending(i => i.Price),
                _ => query.OrderByDescending(i => i.Id) // Newest first
            };

            var result = await query
                .Select(i => new AllitemDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Description = i.Description,
                    CoverImage = i.CoverImage,
                    Price = i.Price,
                    SellerId = i.Seller.Id,
                    SellerName = i.Seller.Name,
                    averageRating = i.Reviews.Any() ? i.Reviews.Average(r => r.Rating) : 0,
                    CategoryName = i.Category.Name
                })
                .ToListAsync();

            return result;
        }

    }
}
