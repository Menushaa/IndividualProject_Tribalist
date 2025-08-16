using IndividualProject.Data;
using IndividualProject.Models;
using IndividualProject.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace IndividualProject.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _DbContext;

        public CategoryRepository(ApplicationDbContext DbContext)
        {
            _DbContext = DbContext;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _DbContext.Categories.AsNoTracking().ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _DbContext.Categories.FindAsync(id);
        }

        public async Task AddAsync(Category category)
        {
            await _DbContext.Categories.AddAsync(category);
        }

        public async Task UpdateAsync(Category category)
        {
            _DbContext.Categories.Update(category);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(Category category)
        {
            _DbContext.Categories.Remove(category);
            await Task.CompletedTask;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _DbContext.Categories.AnyAsync(c => c.Id == id);
        }

        public async Task<bool> SaveAsync()
        {
            return await _DbContext.SaveChangesAsync() > 0;
        }
    }

}
