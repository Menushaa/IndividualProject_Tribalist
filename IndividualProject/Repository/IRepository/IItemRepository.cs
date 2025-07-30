using IndividualProject.DTO;
using IndividualProject.Models;

namespace IndividualProject.Repository.IRepository
{
    public interface IItemRepository
    {
        public Task <Item> GetItemById (int id);
        public Task<Item> GetItem (int SellerId,int id);
        public Task<List<Item>> GetItemsBySellerId (int SellerId);
        public Task<bool> CreateItem(int SellerId, CreateItemDto itemDto);
        public Task<Item> DeleteItem(int id);
        public Task<List<AllitemDto>> GetAllItem();
        public Task<Item> UpdateItem(int id, CreateItemDto itemDto);
    }
}
